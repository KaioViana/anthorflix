import { Request, Response } from 'express'
import { UploadFileService } from '../services/UploadFileService'


interface MulterRequest extends Request {
  file: any
}

class UploadFileController {
  async handle(req: Request, res: Response) {
    const { originalname: name, filename: path  } = (req as MulterRequest).file

    const service = new UploadFileService()

    const result = await service.execute(name, path)

    return res.json(result)
  }
}

export { UploadFileController }
