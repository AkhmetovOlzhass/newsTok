import dotenv from 'dotenv';
import { Text } from './routes/videos/models/text';

dotenv.config();

interface TextData {
  title: string;
  text: string;
}

const saveDataToMongoDB = async (data: TextData[], site): Promise<void> => {
  try {
    await Promise.all(data.map(async (el) => {
      const existingText = await Text.findOne({ title: el.title });
      if (existingText) {
        console.log('Text with this title already exists:', el.title);
        return;
      }

      const newText = new Text({
        title: el.title,
        text: el.text,
        date: new Date(),
        link: null,
        source: site
      });

      await newText.save();
      console.log('Data saved: ' + el.title);
    }));
  } catch (err) {
    console.error('Error saving data:', err);
  }
};

export { saveDataToMongoDB };