
import { Router, Request, Response } from 'express';4
import VideosController from './videos-controller';
import VideosService from './videos-service';

const videosRouter = Router();
const videosService = new VideosService();
const videosController = new VideosController(videosService);

videosRouter.get('/all', (req, res) => videosController.getAllVideos(req, res));

export default videosRouter;