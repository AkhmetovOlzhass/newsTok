import { Text } from "./models/text";

class VideosService {
  async getAllVideos(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const videos = await Text.find({ link: { $ne: null } }) // Фильтруем документы, у которых поле link не равно null
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
      return videos;
    } catch (error) {
      throw new Error('Failed to fetch videos');
    }
  }
}

export default VideosService;