import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { quizReducer, QuizState } from './slice/QuizSlice'
import { appReducer, AppState } from './slice/AppSlice'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    app: appReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type { QuizState }
export type { AppState }

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
