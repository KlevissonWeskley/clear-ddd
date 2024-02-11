import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerRepository } from '../repositories/answer-repository'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface CommentOnAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
    answerComment: AnswerComment
}>

export class CommentOnAnswerUseCase {
    constructor(
        private answerRepository: AnswerRepository,
        private answerCommentRepository: AnswerCommentsRepository
    ) {}

    async execute({ 
        authorId,
        answerId,
        content
    }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Question not found')
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        })

        await this.answerCommentRepository.create(answerComment)
          
        return right({
            answerComment
        })
    }    
}