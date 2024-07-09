import fs from 'fs'
import { Readable } from 'stream';
import { promisify } from 'util';
import { synthesizeSpeech } from './textToSpeachService';
import { uploadFileToS3 } from './s3/s3-module';

function splitText(text: string, maxLength: number): string[] {
    const parts: string[] = [];
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

async function mergeAudio(files: string[], outputFilename: string): Promise<string> {
    const outputStream = fs.createWriteStream(outputFilename);
    const passThrough = new Readable({
        read() {}
    });

    passThrough.pipe(outputStream);

    async function readFileContent(file: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(file);
            fileStream.on('data', (chunk: Buffer) => passThrough.push(chunk));
            fileStream.on('end', resolve);
            fileStream.on('error', reject);
        });
    }

    try {
        for (let file of files) {
            await readFileContent(file);
        }
        passThrough.push(null);
        
        return new Promise((resolve, reject) => {
            outputStream.on('finish', () => {
                console.log(`Merged audio file created: ${outputFilename}`);
                resolve(outputFilename);
            });
            outputStream.on('error', reject);
        });
    } catch (error) {
        console.error(`Error merging files: ${error}`);
        throw error;
    }
}

async function processText(description: string): Promise<string | null> {
    const maxLength = 3900;

    console.log(description.length);

    if (description.length > 7500) {
        return null;
    }

    if (description.length > maxLength) {
        const parts = splitText(description, maxLength);
        const audioFiles: string[] = [];
        
        for (let i = 0; i < parts.length; i++) {
            const audioFile = await synthesizeSpeech(parts[i], true);
            if(audioFile) {
                audioFiles.push(audioFile);
            } 
        }
        
        const finalAudio = './audio.wav';

        await mergeAudio(audioFiles, finalAudio);
        
        audioFiles.forEach(file => fs.unlinkSync(file));
        console.log(`Final audio created: ${finalAudio}`);

        const result = await uploadFileToS3({ file: finalAudio, bucketName: process.env.AWS_BUCKET_NAME })
        return result;
    } else {
        const singleAudioFile = await synthesizeSpeech(description, false);
        console.log(`Audio created: ${singleAudioFile}`);
        return singleAudioFile;
    }
}

export { processText }