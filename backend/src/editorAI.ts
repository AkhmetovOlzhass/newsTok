import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { "responseMimeType": "application/json" }});

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': process.env.SHOTSTACK_API || ""
};

interface VideoObj {
  audioSec: number;
  videos: string[];
  caption: string;
  audio: string;
}

async function editVideo(videoObj: VideoObj): Promise<string | void> {
  const everyLength = videoObj.audioSec / videoObj.videos.length;
  let roundedNumber = parseFloat(everyLength.toFixed(1));

  console.log(roundedNumber);

  const prompt = `
    Generate a JSON configuration for a video editing timeline using Shotstack API. The configuration should sequentially arrange videos from a provided object. The number of videos can vary, and their URLs are provided in the object. videoObj.audioSec it contains the length of the audio file, calculate how many seconds each video should last so that the total exactly matches the long audio and use only rounded numbers. start is the first second of each video, length is how long this video will last
    
    mainObject: ${JSON.stringify(videoObj)}

    Length in every video should be ${roundedNumber} seconds
    
    Use this structure for the JSON output:
    {
      "timeline": {
        "background": "#000000",
        "tracks": [
          {
            "clips": [
              {
                "asset": {
                  "type": "caption",
                  "src": videoObj.caption,
                  "background": {
                    "color": "#000000",
                    "padding": 20,
                    "borderRadius": 4,
                    "opacity": 0.4
                  },
                  "font": {
                    "color": "#ffffff",
                    "family": "Montserrat SemiBold",
                    "size": 36,
                    "lineHeight": 0.8
                  },
                  "margin": {
                    "top": 0.65,
                    "left": 0,
                  },
                },
                "start": 0,
                "length": "end",
                "transition": {
                    "in": "slideRight",
                    "out": "slideLeft"
                }
              }
            ]
          },
          {
            "clips": videoObj.videos.map(video => ({
              "asset": {
                "type": "video",
                "src": video,
                "volume": 0,
              },
              "start": "",
              "length": roundedNumber,
            }))
          },

          {
            "clips": [
              {
                  "asset": {
                  "type": "audio",
                  "src": videoObj.audio
                  },
                  "start": 0,
                  "length": "end"
              }
            ]
          }
        ]
      },
      "output": {
        "format": "mp4",
        "resolution": "hd",
        "aspectRatio": "9:16"
      }
    }
  `;

  try {
    const promptResult = await model.generateContent(prompt);
    const text = await promptResult.response.text();
    const jsonResult = JSON.parse(text);

    console.log("json: " + jsonResult);
    

    const videoSuccessId = await getShotstackId(jsonResult);

    console.log("videoSuccess: " + videoSuccessId);
    
    const finalBody = await fetchStatus(videoSuccessId);

    console.log("final" + finalBody);
    

    return finalBody.response.url;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

const getShotstackId = async (jsonResult: any): Promise<string> => {
  const response = await fetch('https://api.shotstack.io/edit/stage/render', {
    method: 'POST',
    body: JSON.stringify(jsonResult),
    headers: headers
  });

  const body = await response.json();
  return body.response.id;
}

const fetchStatus = async (renderId: string): Promise<any> => {
  const url = `https://api.shotstack.io/edit/stage/render/${renderId}`;
  console.log(url);
  

  while (true) {
    const response = await fetch(url, { method: 'GET', headers: headers });
    console.log("response: " + url);
    
    const body = await response.json();

    if (body.response.status === 'done') {
      return body;
    } else if (body.response.error) {
      console.error('Rendering error:', body.response.error);
      break;
    }

    console.log('Current status:', body.response.status);
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

export { editVideo };