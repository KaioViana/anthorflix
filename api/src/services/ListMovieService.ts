import { prismaClient } from '../prisma'


class ListMovieService {
  async execute(page: number) {
    const movieListCount = await prismaClient.movie.count()

    const totalPages = Math.floor(movieListCount/4)

    if (page > totalPages) {
      throw new Error('Range of pages ultrapassed')
    }

    const movieList = await prismaClient.movie.findMany({
      take: 4,
      skip: (page - 1) * 4,
      orderBy: {
        createdAt: 'asc'
      }
    })

    return {
      pages: totalPages,
      movies: movieList
    }
  }

}

export { ListMovieService }