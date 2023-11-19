import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Failed to find question')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('NOt allowed to delete this question')
    }

    await this.questionsRepository.delete(question)
  }
}
