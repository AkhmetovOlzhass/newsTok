import axios from 'axios';
import { load } from 'cheerio';
import { schedule } from 'node-cron';
import { saveDataToMongoDB } from './storage';

import { processHeadlines } from './readHeadlines';

const baseUrl: string = 'https://tengrinews.kz';

interface Article {
  title: string;
  text: string;
}

const parsePage = async (pageNumber: number): Promise<Article[]> => {
  try {
    const url: string = pageNumber === 1 ? `${baseUrl}/news/` : `${baseUrl}/news/page/${pageNumber}/`;
    const response = await axios.get(url);
    const $ = load(response.data);
    let headlinesPromises: Promise<Article>[] = [];

    $('.content_main_item_title a').each((index, element) => {
      const headlineUrl: string = baseUrl + $(element).attr('href');
      headlinesPromises.push(
        axios.get(headlineUrl).then(newResponse => {
          const $1 = load(newResponse.data);
          const fullTitle: string = $1("h1.head-single").text().trim();
          const fullText: string = $1('.content_main_text p').map((idx, el) => $1(el).text().trim()).get().join(' ');
          return { title: fullTitle, text: fullText };
        })
      );
    });

    let articlesTexts: Article[] = await Promise.all(headlinesPromises);
    return articlesTexts.flat().map(({ title, text }) => ({ title, text }));
  } catch (error) {
    console.error(`Error fetching page ${pageNumber}: ${error}`);
    return [];
  }
};

const parsePages = async (): Promise<void> => {
  const pagesToParse: number = 1;
  let page: number = 1;
  let allHeadlines: Article[] = [];

  while (page <= pagesToParse) {
    const headlines: Article[] = await parsePage(page);
    allHeadlines = allHeadlines.concat(headlines);
    page++;
  }

  await saveDataToMongoDB(allHeadlines);
  await processHeadlines();
};

// parsePages()

// schedule('0 */3 * * *', () => {
//   console.log('Running the cron job every 3 hours');
//   parsePages();
// });

export { parsePage, parsePages };