import { Request, Response } from 'express';
import VideosService from './videos-service';

class VideosController {
  private videosService: VideosService;

  constructor(videosService: VideosService) {
    this.videosService = videosService;
  }

  async getAllVideos(req: Request, res: Response): Promise<void> {
    try {
      const videos = await this.videosService.getAllVideos();
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: "Internal server error"});
    }
  }

}

export default VideosController;