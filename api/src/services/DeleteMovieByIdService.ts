import { prismaClient } from '../prisma'


class DeleteMovieByIdService {
  async execute(id: string) {
    const movie = await prismaClient.movie.delete({
      where: { id }
    })

    if (!movie) {
      throw new Error('movie not found')
    }
  }
}

export { DeleteMovieByIdService }