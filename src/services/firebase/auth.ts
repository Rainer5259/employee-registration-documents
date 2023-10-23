import { getAuth } from 'firebase/auth'
import { app } from '.'

export const AuthFirebaseService = getAuth(app)
