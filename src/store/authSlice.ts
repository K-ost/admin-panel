import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../assets/types'

export interface authState {
  user: UserType | null
}

const initialState: authState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    setLogout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.user = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, setUser } = authSlice.actions

export default authSlice.reducer