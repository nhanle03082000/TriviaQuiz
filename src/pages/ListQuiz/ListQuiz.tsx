import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import questionsApi from '~/apis/questions.api'
import HttpStatusCode from '~/constants/httpStatusCode.enum'
import { appActions } from '~/redux/slice/AppSlice'
import { Question } from '~/types/questions.type'
import { SelectedAnswers } from '~/types/selectedAnswers.type'
import { isAxiosError } from '~/utils/utils'
import QuizFilter from './components/QuizFilter'
import path from '~/constants/path'

const ListQuiz = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [listQuiz, setListQuiz] = useState<Question[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({})
  const handleCreateQuiz = async (category: string, difficulty: string) => {
    try {
      dispatch(appActions.startLoading())
      const response = await questionsApi.getCategories(category, difficulty)
      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('Failed to fetch categories')
      }
      setListQuiz(response.data.results)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      dispatch(appActions.stopLoading())
    }
  }
  const handleAnswerSelect = (questionId: string, answer: string) => () => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmitQuiz = () => {
    navigate(path.results, {
      state: { answers: selectedAnswers, questions: listQuiz }
    })
  }
  const allQuestionsAnswered = () => {
    return (
      listQuiz.length > 0 &&
      listQuiz.every((quiz) => Object.prototype.hasOwnProperty.call(selectedAnswers, quiz.question))
    )
  }
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>QUIZ MAKER</h1>
      <QuizFilter handleCreateQuiz={handleCreateQuiz} />

      <div className='space-y-4'>
        {listQuiz.map((quiz, index) => (
          <div key={index} className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-bold text-gray-800'>{quiz.question}</h2>
            {[...quiz.incorrect_answers, quiz.correct_answer].map((answer, i) => (
              <button
                key={i}
                className={`p-2 m-2 ${selectedAnswers[quiz.question] === answer ? 'bg-blue-200' : 'bg-gray-200'}`}
                onClick={handleAnswerSelect(quiz.question, answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        ))}
      </div>
      {allQuestionsAnswered() && (
        <button className='p-2 mt-4 text-white bg-green-500' onClick={handleSubmitQuiz}>
          Submit Quiz
        </button>
      )}
    </div>
  )
}

export default ListQuiz
