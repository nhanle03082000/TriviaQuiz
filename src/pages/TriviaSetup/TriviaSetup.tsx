import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import categoryApi from '~/apis/triviaQuiz.api'
import { difficultySelect } from '~/constants/difficultySelect'
import HttpStatusCode from '~/constants/httpStatusCode.enum'
import { ItemCategory } from '~/types/category.type'
import { isAxiosError } from '~/utils/utils'

const TriviaSetup = () => {
  const [categories, setCategories] = useState<ItemCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    try {
      const response = await categoryApi.getCategories()
      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('Failed to fetch categories')
      }
      setCategories(response.data.trivia_categories)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    }
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  const handleChangeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value)
  }

  const startQuiz = () => {}
  return (
    <div>
      <select id='categorySelect' value={selectedCategory} onChange={handleChangeCategory} aria-label='Select Category'>
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
      >
        {difficultySelect.map((difficulty) => (
          <option key={difficulty.id} value={difficulty.id}>
            {difficulty.name}
          </option>
        ))}
      </select>
      <button id='createBtn' onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  )
}

export default TriviaSetup
