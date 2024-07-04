export interface Questions {
  response_code: number
  results: Question[]
}

export interface Question {
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  answers: string[]
}
