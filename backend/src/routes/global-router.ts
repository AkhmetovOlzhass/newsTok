import { Router } from 'express'
import videosRouter from './videos/videos-router'

const globalRouter = Router()

globalRouter.use('/videos', videosRouter)

export default globalRouter
