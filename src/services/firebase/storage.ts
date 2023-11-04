import { getStorage } from 'firebase/storage'
import { app } from '.'

export const StorageFirebaseService = getStorage(app)
