import { configureStore } from '@reduxjs/toolkit'
import authenticateUserSlice from '../slices/authenticateUser'

export const store = configureStore({
  reducer: { authenticateUser: authenticateUserSlice }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
