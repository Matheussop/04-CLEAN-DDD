import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

export class DeleteAnswerUseCase {
  constructor(private AnswersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const Answer = await this.AnswersRepository.findById(answerId)

    if (!Answer) {
      throw new Error('Failed to find Answer')
    }

    if (authorId !== Answer.authorId.toString()) {
      throw new Error('NOt allowed to delete this Answer')
    }

    await this.AnswersRepository.delete(Answer)
  }
}
