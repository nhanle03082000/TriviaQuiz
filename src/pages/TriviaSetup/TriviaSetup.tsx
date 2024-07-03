import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import categoryApi from '~/apis/triviaQuiz.api'
import { difficultySelect } from '~/constants/difficultySelect'
import HttpStatusCode from '~/constants/httpStatusCode.enum'
import { appActions } from '~/redux/slice/AppSlice'
import { handleSubmitQuiz } from '~/redux/slice/QuizSlice'
import { ItemCategory } from '~/types/category.type'
import { isAxiosError } from '~/utils/utils'
import ListQuiz from '../ListQuiz'

const TriviaSetup = () => {
  const dispatch = useDispatch()

  const [categories, setCategories] = useState<ItemCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    //TODO: Get categories from the API
    try {
      dispatch(appActions.startLoading())

      const response = await categoryApi.getCategories()
      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('Failed to fetch categories')
      }
      // Set the categories state
      setCategories(response.data.trivia_categories)
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

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  const handleChangeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value)
  }

  const startQuiz = () => {
    // TODO: Dispatch the selected category and difficulty to the store using the handleSubmitQuiz action
    dispatch(handleSubmitQuiz({ category: selectedCategory, difficulty: selectedDifficulty }))
  }
  return (
    <div>
      <select
        id='categorySelect'
        className='border border-gray-300 rounded-md p-2 m-2 w-1/2'
        value={selectedCategory}
        onChange={handleChangeCategory}
        aria-label='Select Category'
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        id='difficultySelect'
        value={selectedDifficulty}
        onChange={handleChangeDifficulty}
        aria-label='Select Difficulty'
        className='border border-gray-300 rounded-md p-2 m-2 w-1/2'
      >
        {difficultySelect.map((difficulty) => (
          <option key={difficulty.id} value={difficulty.id}>
            {difficulty.name}
          </option>
        ))}
      </select>
      <button
        id='createBtn'
        onClick={startQuiz}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 w-1/2'
      >
        Start Quiz
      </button>

      <div>
        <ListQuiz />
      </div>
    </div>
  )
}

export default TriviaSetup
