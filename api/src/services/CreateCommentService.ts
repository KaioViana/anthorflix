import { prismaClient } from "../prisma";


type CreateCommentData = {
  user_id: string
  review_id: string
  comment: string
}

class CreateCommentService {
  async execute({ user_id, review_id, comment }: CreateCommentData){
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: {id: user_id }
    })


    if(!userAlreadyExists) {
      throw new Error('User not found!')
    }

    const reviewAlreadyExists = await prismaClient.review.findUnique({
      where: {id: review_id }
    })


    if(!reviewAlreadyExists) {
      throw new Error('review not found!')
    }

    const commentReviewAlreadyExists = await prismaClient.comment.findFirst({
      where: { user_id, review_id}
    })

    if (commentReviewAlreadyExists) {
      const commentReview = await prismaClient.comment.updateMany({
        where: {
          user_id,
          review_id
        },
        data: {text: comment}
      })
      return {message: "update successful", ...commentReview}
    }

    const commentReview = await prismaClient.comment.create({
      data: {user_id, review_id, text: comment}
    })

    return commentReview

  }
}

export { CreateCommentService }
