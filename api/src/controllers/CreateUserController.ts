import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'


class CreateUserController {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service = new CreateUserService()
      const result = await service.execute(body)

      return res.json(result)
    } catch(err) {
      return res.status(400).json({
        message: `Error create user: ${err.message}`
      })
    }
  }
}

export { CreateUserController }
