import { prismaClient } from '../prisma'


class ListMovieService {
  async execute(page: number) {
    const MOVIE_LIST_COUNT = await prismaClient.movie.count()

    const MOVIES_PER_PAGE = 12

    const totalPages = Math.ceil(MOVIE_LIST_COUNT/MOVIES_PER_PAGE)

    if (page > totalPages) {
      throw new Error('Range of pages ultrapassed')
    }

    const movieList = await prismaClient.movie.findMany({
      take: MOVIES_PER_PAGE,
      skip: (page - 1) * MOVIES_PER_PAGE,
      orderBy: {
        createdAt: 'asc'
      }
    })

    return {
      pages: totalPages,
      items: movieList.length,
      movies: movieList
    }
  }
}

export { ListMovieService }