import dotenv from 'dotenv';

dotenv.config();
import { createClient } from "pexels";

const client = createClient(process.env.PEXELS_API);

async function searchVideos(query) {
    try {
        const response = await client.videos.search({ query });
        const videosLength = response.videos.length;
        const url = response.videos[Math.floor(Math.random() * videosLength)].video_files[0].link;
        return url
    } catch (error) {
        console.error('Search failed:', error);
        return null;
    }
  }

export { searchVideos };