import 'dotenv/config'


type DataType = {
  secret: string
  expiresIn: string
}

export default {

  secret: process.env.APP_SECRET,
  expiresIn: '1d'
} as DataType