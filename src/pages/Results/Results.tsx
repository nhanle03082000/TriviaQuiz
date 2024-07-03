import { useLocation, useNavigate } from 'react-router-dom'
import { QuizState } from '~/types/quizState.type'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as QuizState // Type assertion here
  const { answers, questions } = state
  let correctCount = 0

  questions.forEach((question) => {
    if (answers[question.question] === question.correct_answer) {
      correctCount++
    }
  })

  const scoreColor = correctCount <= 1 ? 'text-red-500' : correctCount <= 3 ? 'text-yellow-500' : 'text-green-500'

  const handleCreateQuiz = () => {
    navigate('/')
  }
  if (!questions.length) {
    return (
      <div>
        <h1 className='text-3xl font-bold'>No quiz data found</h1>
        <button className='mt-4 p-2 bg-blue-500 text-white' onClick={handleCreateQuiz}>
          Create A New Quiz
        </button>
      </div>
    )
  }
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
      <button className='mt-4 p-2 bg-blue-500 text-white' onClick={handleCreateQuiz}>
        Create A New Quiz
      </button>
    </div>
  )
}

export default Results
