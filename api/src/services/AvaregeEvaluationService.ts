import { prismaClient } from "../prisma";


type AvaregeEvaluatioData = {
  movie_id: string
}

class AvaregeEvaluationService {
  async execute({movie_id}: AvaregeEvaluatioData) {
    const movieAlreadyExists = await prismaClient.movie.findUnique({
      where: {id: movie_id}
    })

    if(!movieAlreadyExists) {
      throw new Error('Movie not found!')
    }

    const reviews = await prismaClient.review.findMany({
      where: {movie_id}
    })

    
    const evaluations = reviews.map(item => {
      
      return item.evaluation
    })

    const sum = evaluations.reduce((partial_sum, a) => partial_sum + a, 0);

    const avarege = sum / evaluations.length


    await prismaClient.movie.update({
      where: {
        id: movie_id,
      },
      data: {rating: avarege}
    })

    return {message: 'update seccesfull'}
  }
}

export { AvaregeEvaluationService }