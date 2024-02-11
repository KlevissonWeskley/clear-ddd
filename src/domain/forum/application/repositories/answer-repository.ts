import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswerRepository {
    findById(id: string): Promise<Answer | null>
    findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>
    create(asnwer: Answer): Promise<void>
    save(answer: Answer): Promise<void>
    delete(asnwer: Answer): Promise<void>
}