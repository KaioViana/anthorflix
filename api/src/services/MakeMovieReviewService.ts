import { prismaClient } from "../prisma";


type MakeMovieReviewData = {
  evaluation: number
  user_id: string
  movie_id: string
}

class MakeMovieReviewService {
  async execute({ user_id, movie_id, evaluation}: MakeMovieReviewData) {

    if (evaluation < 0 || evaluation > 5) {
      throw new Error('Evaluation out of bounds!')
    }
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: {id: user_id }
    })


    if(!userAlreadyExists) {
      throw new Error('User not found!')
    }

    const movieAlreadyExists = await prismaClient.movie.findUnique({
      where: {id: movie_id}
    })

    if(!movieAlreadyExists) {
      throw new Error('Movie not found!')
    }

    const movieReviewAlreadyExists = await prismaClient.review.findFirst({
      where: { user_id, movie_id}
    })

    if (movieReviewAlreadyExists) {
      const movieReview = await prismaClient.review.updateMany({
        where: {
          user_id,
          movie_id
        },
        data: {evaluation}
      })
      return {message: "update successful", ...movieReview}
    }

    const movieReview = await prismaClient.review.create({
      data: {user_id, movie_id, evaluation}
    })

    return movieReview
  }
}

export { MakeMovieReviewService }
