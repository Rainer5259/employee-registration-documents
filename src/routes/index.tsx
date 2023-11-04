import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createBrowserRouter
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

import AuthenticationScreen from '../pages/AuthenticationScreen'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import EditDocument from '../pages/EditDocument'

export default function AppRouter() {
  const token = useSelector((state: RootState) => state.authenticateUser.token)

  const authRoutes = createRoutesFromElements(
    <Route path="/" errorElement={<Home />}>
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/edit" element={<EditDocument />} />
    </Route>
  )

  const guestRoutes = createRoutesFromElements(
    <Route
      path="/"
      element={<AuthenticationScreen />}
      errorElement={<AuthenticationScreen />}
    />
  )

  const route = createBrowserRouter(token ? authRoutes : guestRoutes)

  return <RouterProvider router={route} />
}
