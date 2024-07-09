import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchVideos } from "./searchStockVideo";
import { editVideo } from "./editorAI";
import axios from "axios";
import fs from 'fs';
import { uploadVideoToS3 } from './s3/s3-module';
import ffmpeg from 'fluent-ffmpeg';
import ffprobeStatic from 'ffprobe-static';
import {generateSubtitles} from './generateSubtitles'
import { Text } from "./routes/videos/models/text";
import { processText } from "./createAudio";

import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { "responseMimeType": "application/json" }});

interface Headline {
  title: string;
  text: string;
}

interface VideoObj {
  audio: string;
  caption: any;
  videos: string[];
  audioSec: number;
}

async function generateFullText(headline: Headline): Promise<{ description: string } | null>{
  const promptFullText = `
    Input JSON data:
    {
      "title": "${headline.title}.",
      "description": "${headline.text}"
    }

    Task:

    Generate a text that combines the title and description from the input data, while:
    1. Removing all mentions of "Tengrinews", "WhatsApp", and any links.
    2. Not including text after the phrases "читайте также" or "read on".
    3. All text should be on Russian language
    4. You should write ALL description text it's very important
    5. Cut all references to images 

    Execution:
    Combine the title and description into one coherent piece, following the rules mentioned above. The result should be returned in JSON format with the key "description".
  `;

  try{


    const promptResult = await model.generateContent(promptFullText);
    const text = promptResult.response.text();

    const jsonResult = JSON.parse(text);

    return jsonResult
  } catch(error){    
    console.log(error);
    return null
  }
}

async function run(headline: Headline): Promise<void> {
    console.log();

    const newHeadline = await generateFullText(headline);

    if(!newHeadline){
      const existingText = await Text.findOne({ title: headline.title });

      if (existingText) {
        existingText.error = true;
        await existingText.save();
        console.log('Document updated successfully:', existingText.error);
      }
      return;
    }

    console.log("Start speech");

    const audio = await processText(newHeadline.description);

    if(!audio){
      const existingText = await Text.findOne({ title: headline.title });

      if (existingText) {
        existingText.error = true;
        await existingText.save();
        console.log('Document updated successfully:', existingText.error);
      }
      return
    }

    const subtitleUrl = await generateSubtitles('audio.wav')

    const allParts: VideoObj = {
    audio: audio,
    caption: subtitleUrl,
    videos: [],
    audioSec: await getAudioDuration(audio) as number
  };

    const promptMain = `
    Task:
      Based on the total audio duration, calculate how many video segments (each 5 seconds long) can be created. For each segment, generate a corresponding part of the description ensuring it adheres to the specifications mentioned. The result should be a list of Video objects where each Video contains a 'title' in English In 3 words.

      Generate ${Math.floor(allParts.audioSec/5)} titles which are suitable for the topic

    Input JSON:
    {
        "description": "${newHeadline.description}",
        "allDuration": ${allParts.audioSec}
    }


    Output Schema:
    Return a list[Video] where each Video = {"title": str}
  `;
  
    try{
      const promptResult = await model.generateContent(promptMain);

      const text = promptResult.response.text();

      console.log(text);

      const jsonResult = JSON.parse(text);

      const videos: string[] = []; 
  
      for (const res of jsonResult) {
        const video = await searchVideos(res.title);
        if(video){
          videos.push(video)
          console.log(video);
        } else{
          const newVideo = await hasTitle(res.title)
          videos.push(newVideo)
          console.log(newVideo);
        }
      }



      allParts.videos = videos;

      console.log("start edit");

      const finalUrl = await editVideo(allParts as VideoObj);

      console.log(finalUrl);

      const filePath = await downloadVideo(finalUrl, 'output.mp4');

      console.log('start loading');

      const s3Url = await uploadVideoToS3({ file: filePath, bucketName: process.env.AWS_BUCKET_NAME });

      console.log('Видео доступно по ссылке:', s3Url);

      const existingText = await Text.findOne({ title: headline.title });

      if (existingText) {
        existingText.link = s3Url;
        await existingText.save();
        console.log('Document updated successfully:', existingText.link);
      } else {
        console.log('No documents matched the query. Document not updated.');
      }


    } catch (error) {
      console.error('An error occurred:', error);
    }
}

async function hasTitle(title){
  const result = await model.generateContent(`generate a simpler title, only one another title for this title: ${title}`);
  const text = result.response.text();
  const jsonResult = JSON.parse(text);
  const video = await searchVideos(jsonResult.title);
  if (video) {
    return video
  } else {
    return await hasTitle(jsonResult.title)
  }
}

async function downloadVideo(videoUrl, outputPath) {
  const response = await axios.get(videoUrl, { responseType: 'stream' });
  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(outputPath));
      writer.on('error', reject);
  });
}

ffmpeg.setFfprobePath(ffprobeStatic.path);

async function getAudioDuration(filePath) {
  return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
          if (err) {
              reject(`Error getting video duration: ${err.message}`);
          } else {
              const duration = metadata.format.duration;
              resolve(duration);
          }
      });
  });
}


export { run };