import { prismaClient } from '../prisma'


class ListMovieByIdService {
  async execute(id: string) {
    const movie = await prismaClient.movie.findFirst({
      where: { id }
    })

    if (!movie) {
      throw new Error('Movie not encontred!')
    }

    return movie
  }
}

export { ListMovieByIdService }
