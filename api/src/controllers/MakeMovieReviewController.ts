import { Request, Response } from 'express'
import { MakeMovieReviewService } from '../services/MakeMovieReviewService'


class MakeMovieReviewController {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service = new MakeMovieReviewService()
      const result = await service.execute(body)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({
        message: `Error evaluation: ${err.message}`
      })
    }
  }
}

export { MakeMovieReviewController }
