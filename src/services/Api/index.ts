import { FirebaseError } from 'firebase/app'
import { AuthFirebaseService } from '../firebase/auth'
import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken
} from 'firebase/auth'

export abstract class Api {
  private authApi: Auth = AuthFirebaseService

  protected signInWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      signInWithEmailAndPassword(this.authApi, email, password)
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }

  protected signInWithCustomToken = (token: string): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      signInWithCustomToken(this.authApi, token)
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }

  protected signUpWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      createUserWithEmailAndPassword(this.authApi, email, password)
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }
}
