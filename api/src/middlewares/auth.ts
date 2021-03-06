import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'


export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, authConfig.secret)
    req.userId = decoded.sub as string

    return next()
  } catch(err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
