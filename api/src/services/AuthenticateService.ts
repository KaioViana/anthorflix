import { prismaClient } from '../prisma'
import authConfig from '../config/auth'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


type AuthenticateData = {
  email: string
  password: string
}

class AuthenticateService {
  async execute({ email, password }: AuthenticateData) {
    const user = prismaClient.user.findFirst({
      where: { email }
    })
    

    if (!user) {
      throw new Error('Password/Email incorrect!')
    }

    const passwordCompare = await compare(password, (await user).password)

    if (!passwordCompare) {
      throw new Error('Password/Email incorrect!')
    }

    const token = sign({
      email: (await user).email,
      
    }, authConfig.secret, {
      subject: (await user).id,
      expiresIn: authConfig.expiresIn
    })

    return {
      token
    }
  }
}

export { AuthenticateService }
