import { Request, Response } from 'express'
import { CreateCommentService } from '../services/CreateCommentService'


class CreateCommentController {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service = new CreateCommentService()
      const result = await service.execute(body)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({
        message: `Error comment: ${err.message}`
      })
    }
  }
}

export { CreateCommentController }
