import { prismaClient } from '../prisma'
import { hash } from 'bcryptjs'


type CreateUserData = {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserData) {
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { email }
    })

    if(userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const passwordHash = await hash(password, 8)

    const user = prismaClient.user.create({
      data: { name, email, password: passwordHash}
    })
    delete (await user).password

    return user
  }
}

export { CreateUserService }
