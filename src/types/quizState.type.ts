import { Question } from './questions.type'
import { SelectedAnswers } from './selectedAnswers.type'

export type QuizState = {
  answers: SelectedAnswers
  questions: Question[]
}
