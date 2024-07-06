import fs from 'fs'
import stream from 'stream';
import { promisify } from 'util';
import { synthesizeSpeech } from './textToSpeachService.js';
import { uploadFileToS3 } from './s3/s3-module.js';
import { Readable } from 'stream';

// Функция для синтеза речи (заглушка)

// Функция для деления текста на части

const pipeline = promisify(stream.pipeline);

function splitText(text, maxLength) {
    const parts = [];
    let start = 0;
    while (start < text.length) {
      let end = Math.min(text.length, start + maxLength);
      if (end < text.length && text[end - 1] !== ' ' && text[end] !== ' ') {
        end = text.lastIndexOf(' ', end) + 1;
      }
      parts.push(text.substring(start, end));
      start = end;
    }
    return parts;
  }

// Функция для объединения аудиофайлов
async function mergeAudio(files, outputFilename) {
    const outputStream = fs.createWriteStream(outputFilename);
    const passThrough = new Readable({
        read() {}  // Пустая реализация метода read, чтобы сделать поток "passive"
    });

    // Подключаем passThrough к выходному потоку
    passThrough.pipe(outputStream);

    // Функция для чтения и передачи содержимого файла в passThrough
    async function readFileContent(file) {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(file);
            fileStream.on('data', (chunk) => passThrough.push(chunk));
            fileStream.on('end', resolve);
            fileStream.on('error', reject);
        });
    }

    try {
        // Последовательно обрабатываем каждый файл
        for (let file of files) {
            await readFileContent(file);
        }
        // После обработки всех файлов закрываем passThrough
        passThrough.push(null);
        
        return new Promise((resolve, reject) => {
            outputStream.on('finish', () => {
                console.log(`Объединенный аудио файл создан: ${outputFilename}`);
                resolve(outputFilename);
            });
            outputStream.on('error', reject);
        });
    } catch (error) {
        console.error(`Ошибка при объединении файлов: ${error.message}`);
        throw error;
    }
}

  async function processText(description) {
    const maxLength = 3900;

    console.log(description.length);

    if(description.length > 7500){
      return null
    }

    if (description.length > maxLength) {

      const parts = splitText(description, maxLength);
      const audioFiles = [];
      
      for (let i = 0; i < parts.length; i++) {
        const audioFile = await synthesizeSpeech(parts[i], true);
        audioFiles.push(audioFile);
      }
      
      const finalAudio = './audio.wav';

      await mergeAudio(audioFiles, finalAudio);
      
      audioFiles.forEach(file => fs.unlinkSync(file));
      console.log(`Final audio created: ${finalAudio}`);
  
      const result = await uploadFileToS3({file: finalAudio, bucketName: process.env.AWS_BUCKET_NAME })
      return result;
    } else {
      const singleAudioFile = await synthesizeSpeech(description, false);
      console.log(`Audio created: ${singleAudioFile}`);
      return singleAudioFile;
    }
  }

// Используйте эту функцию для обработки вашего текста
export {processText}