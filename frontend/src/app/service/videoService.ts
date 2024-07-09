import { Video } from '../types/video';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? "https://newstok-production.up.railway.app/api/videos/all"
  : "http://localhost:5000/api/videos/all";

export async function fetchAllVideos(): Promise<Video[]> {
  try {
    if(BASE_URL){
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    }

    throw new Error('Network response was not ok')
  } catch (error) {
    console.error("Failed to fetch videos: ", error);
    return [];
  }
}