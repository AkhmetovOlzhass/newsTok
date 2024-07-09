import axios, { AxiosError } from 'axios'
import fs from 'fs-extra'
import dotenv from 'dotenv';
import { uploadSubtitleToS3 } from './s3/s3-module';

dotenv.config();

const baseUrl = 'https://api.assemblyai.com/v2'

const headers = {
  authorization: process.env.SUBTITLES_API
}

const generateSubtitles = async (audioUrl) => {
    const path = audioUrl
    const audioData = await fs.readFile(path)
    const uploadResponse = await axios.post(`${baseUrl}/upload`, audioData, {
        headers
    })
    const uploadUrl = uploadResponse.data.upload_url;
    const data = {
        audio_url: uploadUrl,
        language_code: 'ru'
    }

    const url = `${baseUrl}/transcript`
    const response = await axios.post(url, data, { headers: headers })

    const transcriptId = response.data.id
    const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`

    while (true) {
        const pollingResponse = await axios.get(pollingEndpoint, {
            headers: headers
        })
        const transcriptionResult = pollingResponse.data

        if (transcriptionResult.status === 'completed') {
            break
        } else if (transcriptionResult.status === 'error') {
            throw new Error(`Transcription failed: ${transcriptionResult.error}`)
        } else {
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
    }

    const subtitles = await getSubtitleFile(
        transcriptId,
        'srt' // or srt
    )

    const subtitleUrl = await uploadSubtitleToS3({file: subtitles, bucketName: process.env.AWS_BUCKET_NAME })

    console.log(subtitleUrl);

    return subtitleUrl;
}

async function getSubtitleFile(
    transcriptId,
    fileFormat
  ) {
    if (!['srt', 'vtt'].includes(fileFormat)) {
      throw new Error(
        `Unsupported file format: ${fileFormat}. Please specify 'srt' or 'vtt'.`
      )
    }
  
    const url = `https://api.assemblyai.com/v2/transcript/${transcriptId}/${fileFormat}`
  
    try {
      const response = await axios.get(url, { headers })
      return response.data
    } catch (error) {
      throw new Error(
        `Failed to retrieve ${fileFormat.toUpperCase()} file: ${error}`
      )
    }
  }

export {generateSubtitles};