import { useLocation } from 'react-router-dom'

const Results = () => {
  const location = useLocation()
  const { listQuiz, selectedAnswers } = location.state
  console.log('listQuiz', listQuiz)
  console.log('selectedAnswers', selectedAnswers)
  return <div>TriviaSetup</div>
}

export default Results
