import axios from 'axios';
import { Agent } from 'https';
import { stringify } from 'qs';
import { v4 as uuidv4 } from 'uuid';
import { uploadFileToS3 } from './s3/s3-module.js';
import fs from 'fs'

import dotenv from 'dotenv';
dotenv.config();

const instance = axios.create({
    httpsAgent: new Agent({ rejectUnauthorized: false })
});

async function getAccessToken() {
    const url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
    const authData = Buffer.from(`${process.env.SBER_ID}:${process.env.SBER_SECRET}`).toString('base64');

    const uniqueRqUID = uuidv4();

    try {
        const response = await instance.post(url, stringify({ scope: 'SALUTE_SPEECH_PERS' }), {
            headers: {
                'Authorization': `Basic ${authData}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'RqUID': uniqueRqUID
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Ошибка при получении токена:', error);
        return null;
    }
}

async function synthesizeSpeech(text, isLocal) {
    const accessToken = await getAccessToken();


    if (!accessToken) {
        console.log('Не удалось получить токен доступа.');
        return;
    }
    const url = 'https://smartspeech.sber.ru/rest/v1/text:synthesize';
    const params = {
      format: 'wav16',
      voice: ['Bys_24000', 'Nec_24000', 'May_24000', 'Tur_24000', 'Ost_24000', 'Pon_24000']
    };

    try {

      const response = await instance.post(`${url}?format=${params.format}&voice=${params.voice[Math.floor(Math.random() * params.voice.length)]}`, text, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/text'
        },
        responseType: 'arraybuffer'
      });

      if(isLocal){
        const localFile = await saveAudioLocallFile(response.data)
        return localFile
      } else{
        await saveAudioLocally(response.data)

        const result = await uploadFileToS3({file: './audio.wav', bucketName: process.env.AWS_BUCKET_NAME })
  
        return result 
      }
    } catch (error) {
      console.log("textToSpeech error: " + error);
      return null
    }
}

async function saveAudioLocally(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./audio.wav', Buffer.from(data), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Файл успешно сохранен');
      }
    });
  });
}

async function saveAudioLocallFile(data) {
  const finalLocal = `./audio-${Date.now()}.wav`
  return new Promise((resolve, reject) => {
    fs.writeFile(finalLocal, Buffer.from(data), (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Файл успешно сохранен");
        resolve(finalLocal);
      }
    });
  });
}


export { synthesizeSpeech };