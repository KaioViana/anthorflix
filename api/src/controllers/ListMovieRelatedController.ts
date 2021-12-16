import { Request, Response } from 'express'
import { ListMovieRelatedService } from '../services/ListMovieRelatedService'


class ListMovieRelatedController {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service = new ListMovieRelatedService()
      const result = await service.execute(body)

      return res.json(result)
    } catch (error) {
      return res.status(400).json({
        message: `Error fetching data: ${error.message}`
      }) 
    }
  }
}

export { ListMovieRelatedController }
