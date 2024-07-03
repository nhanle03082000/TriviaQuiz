import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'

export interface QuizState {
  category: string
  difficulty: string
}
const initialState: QuizState = {
  category: '',
  difficulty: 'easy'
}

const sliceName = 'quiz'

const quizSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    handleSubmitQuiz(state, action: PayloadAction<QuizState>) {
      state.category = action.payload.category
      state.difficulty = action.payload.difficulty
    }
  }
})

const selectQuiz = (state: { [sliceName]: QuizState }) => state[sliceName]
export const quizSelector = {
  selectCategory: createSelector(selectQuiz, (quiz) => quiz.category),
  selectDifficulty: createSelector(selectQuiz, (quiz) => quiz.difficulty)
}

export const { handleSubmitQuiz } = quizSlice.actions
export const quizReducer = quizSlice.reducer
