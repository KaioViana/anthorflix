import { prismaClient } from '../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


type AuthenticateData = {
  email: string
  password: string
}

class AuthenticateService {
  async execute({ email, password }: AuthenticateData) {
    const user = prismaClient.user.findUnique({
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
      
    }, 'NlwValoriza', {
      subject: (await user).id,
      expiresIn: '1d'
    })

    return {
      token
    }
  }
}

export { AuthenticateService }
