import { Request, Response } from 'express'
import { DeleteMovieByIdService } from '../services/DeleteMovieByIdService'


class DeleteMovieByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new DeleteMovieByIdService()
      await service.execute(id)

      return res.json({ message: 'Movie deleted' })

    } catch (error) {
      return res.status(400).json({
        message: `Error deleteing movie: ${error.message}`
      })
      
    }
  }
}

export { DeleteMovieByIdController }
