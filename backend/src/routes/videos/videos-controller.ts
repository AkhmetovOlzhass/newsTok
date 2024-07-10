import { Request, Response } from 'express';
import VideosService from './videos-service';

class VideosController {
  private videosService: VideosService;

  constructor(videosService: VideosService) {
    this.videosService = videosService;
  }

  async getAllVideos(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const videos = await this.videosService.getAllVideos(page, limit);
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: "Internal server error"});
    }
  }

}

export default VideosController;