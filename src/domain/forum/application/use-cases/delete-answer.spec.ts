import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a Answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('Author-1') },
      new UniqueEntityID('Answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'Author-1',
      answerId: 'Answer-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should not be able to delete a Answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('Author-1') },
      new UniqueEntityID('Answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(
      async () =>
        await sut.execute({
          authorId: 'Author-2',
          answerId: 'Answer-1',
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
