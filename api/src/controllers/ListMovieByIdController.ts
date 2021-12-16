import { Request, Response } from 'express'
import { ListMovieByIdService } from "../services/ListMovieByIdService"
 

class ListMovieByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new ListMovieByIdService()
      const result = await service.execute(id)

      return res.json(result)

    } catch (error) {
      return res.status(400).json({
        message: `Error fetching movie: ${error.message}`
      })
    }
  }
}

export { ListMovieByIdController }
