import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID
// } from '@firebase_env'

export const firebaseConfig = {
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // databaseURL: process.env.DATABASE_URL,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID
  apiKey: 'AIzaSyA3QkAHwDFKBMKoUshfIbnTPvQ85b5h10k',
  authDomain: 'db-erd.firebaseapp.com',
  databaseURL: 'https://db-erd-default-rtdb.firebaseio.com',
  projectId: 'db-erd',
  storageBucket: 'db-erd.appspot.com',
  messagingSenderId: '757586612421',
  appId: '1:757586612421:web:86bee2f47e16de840260ac',
  measurementId: 'G-66HQF3HF7N'
}
export const app = initializeApp(firebaseConfig)

export const authFirebaseService = getAuth(app)

const db = getFirestore(app)
// export const authFirebaseService = getAuth(app)
