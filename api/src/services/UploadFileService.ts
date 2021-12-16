import { prismaClient } from '../prisma'


class UploadFileService {
  async execute(name: string, path: string) {
    const url = `${process.env.APP_URL}/files/${path}`

    const createFile = await prismaClient.poster.create({
      data: {
        name,
        path,
        url
      }
    })

    return createFile
  }
}

export { UploadFileService }