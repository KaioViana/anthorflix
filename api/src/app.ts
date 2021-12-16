import express, { Express } from 'express'
import cors from 'cors'
import path from 'path'
import { routes } from './routes'
import 'dotenv/config'


class App {
  server: Express

  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server