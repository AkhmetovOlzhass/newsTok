import { run } from './AIFunction';
import { Text } from './routes/videos/models/text';

interface Headline {
  title: string;
  text: string;
  link?: string | null | undefined;
  error?: boolean;
  date?: Date;
}

async function processHeadlines(): Promise<void> {
  try {
    
    
    const headlines: Headline[] = (await Text.find().sort({ date: -1 })) as unknown as Headline[];
    for (let headline of headlines) {
      if (headline.title) {
        const existingText = await Text.findOne({ title: headline.title });

        if (existingText && !existingText.link && !existingText.error) {
          
          await run(headline);
        } else {
          console.log('No documents matched the query. Document not updated.');
        }
      }
    }
  } catch (error: any) {
    console.error('Failed to read or process headlines:', error);
  }
}

export { processHeadlines };