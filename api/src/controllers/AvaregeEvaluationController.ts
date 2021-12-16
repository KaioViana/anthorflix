import { Request, Response } from 'express'
import { AvaregeEvaluationService } from '../services/AvaregeEvaluationService'



class AvaregeEvaluationController  {
  async handle(req: Request, res: Response) {
    const { body } = req

    try {
      const service = new AvaregeEvaluationService()      
      const result = await service.execute(body)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({message: `Error calculate: ${err.message}`})
    }
  }
}

export { AvaregeEvaluationController }
