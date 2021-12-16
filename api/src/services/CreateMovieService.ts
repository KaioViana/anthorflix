import { prismaClient } from '../prisma'
import { createMovieSchema } from '../validations'


type MovieType = {
  title:        string
  year:         number
  released?:    string
  runtime?:     string
  director?:    string
  writer?:      string
  actors?:      string
  plot?:        string
  language:     string
  country?:     string
  awards?:      string
  rating?:      number
  type:         string
  gender:       string
}

class CreateMovieService {
  async execute(movie: MovieType) {
    let createMovie: MovieType

    const movieAlreadyExists = await prismaClient.movie.findFirst({
      where: {
        title: movie.title
      }
    })

    if(movieAlreadyExists) {
      throw new Error('Movie already exists!')
    }
    
    await createMovieSchema.validate(movie, { abortEarly: false })
    .then(async () => {

        createMovie = await prismaClient.movie.create({ data: movie })

      }).catch((err) => {
        const errors = err.inner.map(e => {
          return e.message
          
        })
        throw new Error(errors.join(', '))
      })
    
    return createMovie
  }
}

export { CreateMovieService }
