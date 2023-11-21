import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface ListRecentAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface ListRecentAnswersUseCaseResponse {
  answers: Answer[]
}

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: ListRecentAnswersUseCaseRequest): Promise<ListRecentAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
