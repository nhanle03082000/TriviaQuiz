import { createSelector, createSlice } from '@reduxjs/toolkit'

export interface AppState {
  loading: boolean
}

const sliceName = 'app'
const initialState: AppState = {
  loading: false
}

const appSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    toggleLoading(state) {
      state.loading = !state.loading
    },
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    }
  }
})

// ===========================================================
// >>>> FOR EXPORTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ===========================================================
const appState = (state: { [sliceName]: AppState }) => state[sliceName]

export const appSelector = {
  loading: createSelector(appState, (app) => app.loading)
}

export const appActions = appSlice.actions
export const appReducer = appSlice.reducer
