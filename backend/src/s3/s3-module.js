import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from '../middlewares/s3-middleware.js';
import fs from 'fs';
import fsp from 'fs/promises';

async function uploadSubtitleToS3({ file, bucketName }) {
  const key = `subtitle-${Date.now()}.srt`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: Buffer.from(file)
    }
  });

  const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  await upload.done();
  
  return url;
}

async function uploadFileToS3({ file, bucketName }) {
    const fileContent = await fsp.readFile(file);
    const key = `audio-${Date.now()}.wav`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ACL: 'public-read'
      }
    });

    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    await upload.done();
    
    return url;
}

async function uploadVideoToS3({ file, bucketName }) {
  const key = `video-${Date.now()}.mp4`;
  const fileStream = fs.createReadStream(file);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: fileStream
    }
  });


  await upload.done();

  const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  
  return url;
}


export { uploadFileToS3, uploadVideoToS3, uploadSubtitleToS3 };