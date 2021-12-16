import { Request, Response } from 'express';
import { MarkAsWatchedService } from '../services/MarkAsWatchedService'


class MarkAsWatchedController {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service = new MarkAsWatchedService();
      const result = await service.execute(body)

      return res.json(result)
    } catch(err) {
      return res.status(400).json({
        message: `Error marking as watched: ${err.message}`
      })
    } 
  } 
}

export { MarkAsWatchedController }
