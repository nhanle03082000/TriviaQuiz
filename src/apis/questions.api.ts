import { Questions } from '~/types/questions.type'
import http from '~/utils/http'
const URL_QUESTIONS = '/api.php?amount=5'
const questionsApi = {
  fetchQuizData(category: string, difficulty: string) {
    return http.get<Questions>(`${URL_QUESTIONS}&category=${category}&difficulty=${difficulty}&type=multiple`)
  }
}

export default questionsApi
