import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QuizState } from '~/types/quizState.type'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as QuizState // Type assertion here
  const { answers, questions } = state

  const { correctCount, scoreColor } = useMemo(() => {
    // TODO: Calculate the correct answers and the score color
    let correct = 0
    // Loop through the questions and check if the answer is correct
    questions.forEach((question) => {
      if (answers[question.question] === question.correct_answer) {
        // If the answer is correct, increment the correct count
        correct++
      }
    })
    // Set the color based on the correct count
    const color = correct <= 1 ? 'text-red-500' : correct <= 3 ? 'text-yellow-500' : 'text-green-500'
    return { correctCount: correct, scoreColor: color }
  }, [questions, answers])

  const handleCreateQuiz = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <div className='max-w-2xl p-4 mx-auto my-8 rounded-lg shadow-lg'>
      <h1 className='mb-6 text-3xl font-bold text-center'>Quiz Results</h1>
      {questions.map((question, index) => (
        <div key={index} className='p-4 mb-4 bg-gray-100 rounded-md'>
          <h2 className='text-xl font-semibold'>{question.question}</h2>
          <p
            className={`my-2 ${answers[question.question] === question.correct_answer ? 'text-green-500' : 'text-red-500'}`}
          >
            Your Answer: {answers[question.question]}
          </p>
          <p className='text-green-500'>Correct Answer: {question.correct_answer}</p>
        </div>
      ))}
      <div className='p-4 mt-6 text-center border-t'>
        <p className={`text-2xl font-bold ${scoreColor}`}>
          Your Score: {correctCount} / {questions.length}
        </p>
        <button
          className='px-6 py-2 mt-4 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600'
          onClick={handleCreateQuiz}
        >
          Create A New Quiz
        </button>
      </div>
    </div>
  )
}

export default Results
