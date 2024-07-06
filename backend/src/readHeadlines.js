import { run } from './AIFunction.js';
import { Text } from './storage.js';

async function processHeadlines() {
  try {
    const headlines = await Text.find().sort({ date: 1 });
    for (let headline of headlines) {
      const existingText = await Text.findOne({ title: headline.title });

      if (!existingText.link && !existingText.error) {
        await run(headline);
      } else {
        console.log('No documents matched the query. Document not updated.');
      }
    }
  } catch (error) {
    console.error('Failed to read or process headlines:', error);
  }
  }

  export { processHeadlines };
