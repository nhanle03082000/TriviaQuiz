import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import categoryApi from '~/apis/triviaQuiz.api'
import { difficultySelect } from '~/constants/difficultySelect'
import HttpStatusCode from '~/constants/httpStatusCode.enum'
import { ItemCategory } from '~/types/category.type'
import { isAxiosError } from '~/utils/utils'
interface IPropsQuizFilter {
  handleCreateQuiz: (category: string, difficulty: string) => Promise<void>
}

function QuizFilter({ handleCreateQuiz }: IPropsQuizFilter) {
  const [categories, setCategories] = useState<ItemCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    //TODO: Get categories from the API
    try {
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
    }
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  const handleChangeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value)
  }

  const createQuiz = () => {
    handleCreateQuiz(selectedCategory, selectedDifficulty)
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
        <option value=''>{selectedCategory ? '' : 'Select a category'}</option>
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
        defaultValue={''}
      >
        <option value=''>{selectedDifficulty ? '' : 'Select a difficulty'}</option>

        {difficultySelect.map((difficulty) => (
          <option key={difficulty.id} value={difficulty.id}>
            {difficulty.name}
          </option>
        ))}
      </select>
      <button
        id='createBtn'
        onClick={createQuiz}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 w-1/2'
      >
        Create Quiz
      </button>
    </div>
  )
}

export default QuizFilter
