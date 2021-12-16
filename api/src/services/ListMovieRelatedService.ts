import { prismaClient } from '../prisma'


type QueryType = {
  title?:        string
  year?:         number
  released?:     string
  runtime?:      string
  director?:     string
  writer?:       string
  actors?:       string
  plot?:         string
  language?:     string
  country?:      string
  awards?:       string
  rating?:       number
  type?:         string
  gender?:       string
}

class ListMovieRelatedService {
  async execute(query: QueryType) {
    const movies = await prismaClient.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query.title,
            },
          },
          {
            year: {
              equals: query.year,
            }
          },
          {
            released: {
              contains: query.released,
            }
          },
          {
            runtime: {
              contains: query.runtime,
            }
          },
          {
            director: {
              contains: query.director,
            }
          },
          {
            writer: {
              contains: query.writer,
            }
          },
          {
            actors: {
              contains: query.actors,
            }
          },
          {
            language: {
              contains: query.language
            }
          },
          {
            country: {
              contains: query.country
            }
          },
          {
            awards: {
              contains: query.awards
            }
          },
          {
            rating: {
              equals: query.rating
            }
          },
          {
            type: {
              contains: query.type
            }
          },
          {
            gender: {
              contains: query.gender
            }
          }
        ]
      }
    })

    if (!movies) {
      throw new Error('Movie not found!')
    }

    return movies
  }
}

export { ListMovieRelatedService }
