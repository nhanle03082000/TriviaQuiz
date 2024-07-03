import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appReducer, AppState } from './slice/AppSlice'
import { QuizState } from './slice/QuizSlice'

export const store = configureStore({
  reducer: {
    app: appReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type { AppState, QuizState }

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
