import { Video } from '../types/video';

const BASE_URL = "http://localhost:5000/api/videos/all";

export async function fetchAllVideos(page = 1, limit = 10): Promise<Video[]> {
  try {
    if(BASE_URL){
      const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
      
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