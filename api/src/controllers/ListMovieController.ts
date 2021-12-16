import { Request, Response } from 'express'
import { ListMovieService } from '../services/ListMovieService'


class ListMovieController {
  async handle(req: Request, res: Response) {
    const { page } = req.query

    try {
      const service = new ListMovieService()
      const result =  await service.execute(Number(page))

      return res.json(result)

    } catch (error) {
        return res.status(400).json({
          message: `error fetching movies: ${error.message}`
        })
    }
  }
}

export { ListMovieController }