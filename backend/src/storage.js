// import { writeFileSync } from 'fs';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

// const saveDataToJson = (newData, filename) => {
//   const __dirname = dirname(fileURLToPath(import.meta.url));
//   const filePath = join(__dirname, filename);
//   writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');
//   console.log(`Data saved to ${filePath}`);
// };

// export { saveDataToJson };

import dotenv from 'dotenv';
import { Text } from './routes/videos/models/text.js';

dotenv.config();

const saveDataToMongoDB = async (data) => {
  try {
    await Promise.all(data.map(async (el) => {
      // Проверяем, существует ли уже текст с таким же названием
      const existingText = await Text.findOne({ title: el.text.title });
      if (existingText) {
        console.log('Text with this title already exists:', el.text.title);
        return;  // Пропускаем сохранение, если текст с таким названием уже есть
      }

      const newText = new Text({
        title: el.text.title,
        text: el.text.text,
        date: new Date(),
        link: null
      });
  
      await newText.save();
      console.log('Data saved');
    }));
  } catch (err) {
    console.error('Error saving data:', err);
  }
};

export { saveDataToMongoDB, Text };