import { Router, Request, Response } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import { CreateMovieController } from './controllers/CreateMovieController'
import { UploadFileController } from './controllers/UploadFileController'
import { ListMovieController } from './controllers/ListMovieController'
import { ListMovieByIdController } from './controllers/ListMovieByIdController'
import { DeleteMovieByIdController } from './controllers/DeleteMovieByIdController'
import { ListMovieRelatedController } from './controllers/ListMovieRelatedController'
import { CreateUserController } from './controllers/CreateUserController'
import { AuthenticateController } from './controllers/AuthenticateController'
import { MarkAsWatchedController } from './controllers/MarkAsWatchedController'
import { MakeMovieReviewController } from './controllers/MakeMovieReviewController'
import { CreateCommentController } from './controllers/CreateCommentController'
import { AvaregeEvaluationController } from './controllers/AvaregeEvaluationController'


export const routes = Router()
const upload = multer(multerConfig)

routes.get('/', (req: Request, res: Response) => {
  return res.json({message: 'ANTHORFLIX'})
})
routes.post('/movies', new CreateMovieController().handle)
routes.post('/files', upload.single('file'), new UploadFileController().handle)
routes.get('/movies', new ListMovieController().handle)
routes.get('/movies/:id', new ListMovieByIdController().handle)
routes.delete('/movies/:id', new DeleteMovieByIdController().handle)
routes.post('/movies-related', new ListMovieRelatedController().handle)
routes.post('/users', new CreateUserController().handle)
routes.post('/sessions', new AuthenticateController().handle)
routes.post('/watcheds', new MarkAsWatchedController().handle)
routes.post('/reviews', new MakeMovieReviewController().handle)
routes.post('/comments', new CreateCommentController().handle)
routes.post('/avarege-reviews', new AvaregeEvaluationController().handle)
