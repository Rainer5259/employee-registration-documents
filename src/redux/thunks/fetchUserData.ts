import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'
import UserService from '../../services/Api/user.service'

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    try {
      const response = await UserService.signInWithToken('')
      return response
    } catch (e) {
      const response = e as FirebaseError
      return Promise.reject(response)
    }
  }
)
