import { createBrowserRouter } from 'react-router-dom'
import AuthenticationScreen from '../pages/AuthenticationScreen'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationScreen />
  }
])
