import axios from 'axios';
import { load } from 'cheerio';
import { schedule } from 'node-cron';

import { saveDataToMongoDB } from './storage.js';
import { processHeadlines } from './readHeadlines.js';


const baseUrl = 'https://tengrinews.kz';



const parsePage = async (pageNumber) => {
  try {
    const url = pageNumber === 1 ? `${baseUrl}/news/` : `${baseUrl}/news/page/${pageNumber}/`;
    const response = await axios.get(url);
    const $ = load(response.data);
    let headlinesPromises = [];

    $('.content_main_item_title a').each((index, element) => {
      const headlineUrl = baseUrl + $(element).attr('href');
      headlinesPromises.push(
        axios.get(headlineUrl).then(newResponse => {
          const $1 = load(newResponse.data);
          const fullTitle = $1("h1.head-single").text().trim();
          const fullText = $1('.content_main_text p').map((idx, el) => $1(el).text().trim()).get().join(' ');
          return { title: fullTitle, text: fullText };
        })
      );
    });

    let articlesTexts = await Promise.all(headlinesPromises);
    return articlesTexts.flat().map(text => ({ text }));
  } catch (error) {
    console.error(`Error fetching page ${pageNumber}: ${error}`);
    return [];
  }
};



const parsePages = async () => {
  const pagesToParse = 3;
  let page = 1;
  let allHeadlines = [];

  while (page <= pagesToParse) {
    const headlines = await parsePage(page);
    allHeadlines = allHeadlines.concat(headlines);
    page++;
  }


  await saveDataToMongoDB(allHeadlines);
  await processHeadlines()
};

// parsePages()

// schedule('0 */3 * * *', () => {
//   console.log('Running the cron job every 3 hours');
//   parsePages();
// });



export { parsePage, parsePages };