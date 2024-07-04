import { useCallback, useState } from 'react'
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
import _ from 'lodash'
const ListQuiz = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [listQuiz, setListQuiz] = useState<Question[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({})
  const handleCreateQuiz = useCallback(
    async (category: string, difficulty: string) => {
      // TODO: Fetch questions from the API based on the category and difficulty
      try {
        // Start loading
        dispatch(appActions.startLoading())
        const response = await questionsApi.fetchQuizData(category, difficulty)
        // Check if the response status is not OK
        if (response.status !== HttpStatusCode.Ok) {
          throw new Error('Failed to fetch categories')
        }
        // use lodash to shuffle the answers
        const shuffledQuestions = response.data.results.map((question) => {
          return {
            ...question,
            answers: _.shuffle([...question.incorrect_answers, question.correct_answer])
          }
        })
        setListQuiz(shuffledQuestions)
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
      } finally {
        dispatch(appActions.stopLoading())
      }
    },
    [dispatch]
  )

  const handleAnswerSelect = useCallback((questionId: string, answer: string) => {
    // TODO: Update the selectedAnswers state
    // If the answer is already selected, keep it, otherwise update it
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === answer ? prev[questionId] : answer
    }))
  }, [])

  const handleSubmitQuiz = useCallback(() => {
    // TODO: Navigate to the Result page
    navigate(path.results, {
      state: { answers: selectedAnswers, questions: listQuiz }
    })
  }, [navigate, selectedAnswers, listQuiz])

  const allQuestionsAnswered = useCallback(() => {
    // TODO: Check if all questions have been answered
    // If the listQuiz length is greater than 0 and every question has been answered
    // eslint-disable-next-line no-prototype-builtins
    return listQuiz.length > 0 && listQuiz.every((quiz) => selectedAnswers.hasOwnProperty(quiz.question))
  }, [listQuiz, selectedAnswers])

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>QUIZ MAKER</h1>
      <QuizFilter handleCreateQuiz={handleCreateQuiz} />

      <div className='space-y-4'>
        {listQuiz.map((quiz, index) => (
          <div key={index} className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-bold text-gray-800'>{quiz.question}</h2>
            {quiz.answers.map((answer, i) => (
              <button
                key={i}
                className={`p-2 m-2 ${selectedAnswers[quiz.question] === answer ? 'bg-blue-200' : 'bg-gray-200'}`}
                onClick={() => handleAnswerSelect(quiz.question, answer)}
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
