import { prismaClient } from '../prisma'


type MarkAsWatchedData = {
  user_id: string
  movie_id: string
  watched?: boolean
}

class MarkAsWatchedService {
  async execute({ user_id, movie_id, watched }: MarkAsWatchedData) {
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { id: user_id }
    })

    if(!userAlreadyExists) {
      throw new Error('User not found!')
    }

    const movieAlreadyExists = await prismaClient.movie.findUnique({
      where: {id: movie_id}
    })

    if(!movieAlreadyExists) {
      throw new Error('User not found!')
    }

    const movieWatchedAlreadyExists = await prismaClient.watched.findFirst({
      where: {user_id, movie_id}
    })

    if (movieWatchedAlreadyExists) {
      const movieWatched = await prismaClient.watched.updateMany({
        where: {
          movie_id,
          user_id
        },
        data: {watched}
      })
      return {message: "update successful", ...movieWatched}
    }

    const movieWatched = await prismaClient.watched.create({
      data: {user_id, movie_id, watched}
    })

    return movieWatched
  }
}

export { MarkAsWatchedService }
