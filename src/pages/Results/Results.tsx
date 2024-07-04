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
    <div>
      {questions.map((question, index) => (
        <div key={index} className='m-4'>
          <h2 className='text-xl font-bold'>{question.question}</h2>
          <p className={answers[question.question] === question.correct_answer ? 'text-green-500' : 'text-red-500'}>
            Your Answer: {answers[question.question]}
          </p>
          <p className='text-green-500'>Correct Answer: {question.correct_answer}</p>
        </div>
      ))}
      <p className={`text-xl ${scoreColor}`}>
        Your Score: {correctCount} / {questions.length}
      </p>
      <button className='p-2 mt-4 text-white bg-blue-500' onClick={handleCreateQuiz}>
        Create A New Quiz
      </button>
    </div>
  )
}

export default Results
