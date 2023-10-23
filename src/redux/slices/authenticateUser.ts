import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { fetchUserData } from '../thunks/fetchUserData'
import Cookies from 'js-cookie'

export interface AuthenticateUserProps {
  token: string | null
  user: User | null
  error: boolean
  loading: boolean
  errorMessage: string
}

const initialState: AuthenticateUserProps = {
  token: null,
  user: null,
  error: false,
  loading: false,
  errorMessage: ''
}

export const authenticateUserSlice = createSlice({
  name: 'authenticateUser',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
      Cookies.set('authUserFirebase', action.payload!, {})
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchUserData.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.user = action.payload ?? null
    })
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.errorMessage = action.error.message ?? ''
    })
  }
})

export const { setToken } = authenticateUserSlice.actions

export default authenticateUserSlice.reducer
