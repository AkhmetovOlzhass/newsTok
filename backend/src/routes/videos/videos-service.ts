import { Text } from "./models/text";


class VideosService {

  async getAllVideos() {
    try {
      const videos = await Text.find();
      return videos;
    } catch (error) {
      throw new Error('Failed to fetch songs');
    }
  }

}

export default VideosService;