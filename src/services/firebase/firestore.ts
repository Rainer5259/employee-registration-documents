import { getFirestore } from 'firebase/firestore'
import { app } from '.'

export const AuthFirestoreService = getFirestore(app)
