import { createSlice } from '@reduxjs/toolkit'

export interface appState {
  logged: boolean
  notify: string | null
}

const initialState: appState = {
  logged: false,
  notify: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNotify: (state, action) => {
      state.notify = action.payload
    },
    closeNotify: (state) => {
      state.notify = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setNotify, closeNotify } = appSlice.actions

export default appSlice.reducer