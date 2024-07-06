import { Video } from '../types/video';

const BASE_URL = 'http://localhost:5000/api/videos/all';

export async function fetchAllVideos(): Promise<Video[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch videos: ", error);
    return [];
  }
}