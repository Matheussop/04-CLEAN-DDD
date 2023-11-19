import { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  save(question: Question): Promise<Void>
  delete(question: Question): Promise<void>
  create(question: Question): Promise<void>
}
