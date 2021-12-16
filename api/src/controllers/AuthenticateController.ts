import { Request, Response } from 'express'
import { AuthenticateService } from '../services/AuthenticateService'


class AuthenticateController {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service =  new AuthenticateService()
      const result = await service.execute(body)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({
        message: `Error authentication: ${err.message}`
      })
    } 
  }
}

export { AuthenticateController }
