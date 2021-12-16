import { Request, Response } from 'express'
import { CreateMovieService } from '../services/CreateMovieService'


class CreateMovieController {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service = new CreateMovieService();
      const result = await service.execute(body)
      
      return res.json(result)

    } catch (error) {
      return res.status(400).json({
        message: `it was not possible to enter the data: ${error.message}`
      })
    }
  }
}

export { CreateMovieController }