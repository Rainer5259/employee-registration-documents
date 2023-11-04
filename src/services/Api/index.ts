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
import {
  Employees,
  EmployeesRegistersDocumentsInterface
} from '../../utils/types'
import {
  DocumentChange,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { AuthFirestoreService } from '../firebase/firestore'
import { StorageFirebaseService } from '../firebase/storage'
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'
import { Blob } from 'buffer'
export abstract class Api {
  private firebaseAutheticationToken: Auth = AuthFirebaseService
  private firebaseToken: Firestore = AuthFirestoreService
  private firebaseStorage: FirebaseStorage = StorageFirebaseService
  private basePathERD: string
  private uid = 'uid'
  private imagePath = 'uid'

  constructor(basePath: string) {
    this.basePathERD = basePath
  }
  protected signInWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      signInWithEmailAndPassword(
        this.firebaseAutheticationToken,
        email,
        password
      )
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
      signInWithCustomToken(this.firebaseAutheticationToken, token)
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
      createUserWithEmailAndPassword(
        this.firebaseAutheticationToken,
        email,
        password
      )
        .then((userCredential: UserCredential) => {
          resolve(userCredential.user)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }

  protected sendDocumentToStore = (
    data: EmployeesRegistersDocumentsInterface
  ): Promise<EmployeesRegistersDocumentsInterface> => {
    return new Promise<EmployeesRegistersDocumentsInterface>(
      (resolve, reject) => {
        addDoc(collection(this.firebaseToken, this.basePathERD), data)
          .then(() => {
            resolve(data)
          })
          .catch(error => {
            reject(error as FirebaseError)
          })
      }
    )
  }

  protected fetchAllListERD = (): Promise<
    DocumentChange<DocumentData, DocumentData>[]
  > => {
    return new Promise<DocumentChange<DocumentData, DocumentData>[]>(
      (resolve, reject) => {
        getDocs(collection(this.firebaseToken, this.basePathERD))
          .then(response => {
            resolve(response.docChanges())
          })
          .catch(error => {
            reject(error as FirebaseError)
          })
      }
    )
  }

  protected fetchListERDByUserID = (
    uid: string
  ): Promise<DocumentChange<DocumentData, DocumentData>[]> => {
    return new Promise<DocumentChange<DocumentData, DocumentData>[]>(
      (resolve, reject) => {
        getDocs(
          query(
            collection(this.firebaseToken, this.basePathERD),
            where(this.uid, '==', uid)
          )
        )
          .then(response => {
            resolve(response.docChanges())
          })
          .catch(error => {
            reject(error as FirebaseError)
          })
      }
    )
  }

  protected fetchERDByDocID = (docID: string): Promise<DocumentSnapshot> => {
    return new Promise<DocumentSnapshot>((resolve, reject) => {
      getDoc(doc(this.firebaseToken, this.basePathERD, docID))
        .then(response => {
          console.log('response api', response)
          resolve(response)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }

  protected updateDocument = (
    docID: string,
    data: EmployeesRegistersDocumentsInterface
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setDoc(doc(this.firebaseToken, this.basePathERD, docID), data, {
        merge: true
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }

  protected updateHistoryDocument = (
    docID: string,
    data: Employees
  ): Promise<Employees> => {
    return new Promise<Employees>((resolve, reject) => {
      setDoc(doc(this.firebaseToken, this.basePathERD, docID), data)
        .then(() => {
          resolve(data)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }

  protected uploadFileToStorage = (
    docID: string,
    data: Uint8Array
  ): Promise<Uint8Array> => {
    return new Promise<Uint8Array>((resolve, reject) => {
      uploadBytes(ref(this.firebaseStorage, docID), data)
        .then(() => {
          resolve(data)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }

  protected getURLFileFromStorage = (docID: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      getDownloadURL(ref(this.firebaseStorage, docID))
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error as FirebaseError)
        })
    })
  }
  // protected fetchERDByDocID = (docID: string): Promise<DocumentData | null> => {
  //   return new Promise<DocumentData | null>((resolve, reject) => {
  //     doc(this.firebaseToken, this.basePathERD, docID)
  //       .then(response => {
  //         console.log('response api', response)
  //         resolve(response)
  //       })
  //       .catch(error => {
  //         reject(error as FirebaseError)
  //       })
  //   })
  // }
  // protected fetchDoc = (
  //   docID: string
  // ): Promise<EmployeesRegistersDocumentsInterface> => {
  //   return new Promise<EmployeesRegistersDocumentsInterface>(
  //     (resolve, reject) => {
  //       setDoc(
  //         doc(collection(this.firebaseToken, this.basePathERD)),
  //         where(docID, '==', docID)
  //       )
  //         .then(() => {
  //           resolve(data)
  //         })
  //         .catch(error => {
  //           reject(error as FirebaseError)
  //         })
  //     }
  //   )
  // }
  /**ERD: Employees Registers Documents*/
  // protected fetchAllListERD = () => {
  //   return new Promise<EmployeesRegistersDocumentsInterface>(
  //     (resolve, reject) => {
  //       const docRef = doc(this.firebaseToken, this.basePathERD)

  //       const unsubscribe = onSnapshot(docRef, {
  //         next: snapshot => {
  //           const data = snapshot.data() as EmployeesRegistersDocumentsInterface
  //           resolve(data)
  //         },
  //         error: error => {
  //           reject(error)
  //         }
  //       })

  //       unsubscribe()
  //     }
  //   )
  // }

  // protected fetchDocByID = () => {
  //   return new Promise<EmployeesRegistersDocumentsInterface>(
  //     (resolve, reject) => {
  //       const docRef = doc(this.firebaseToken, this.basePathERD)

  //       const unsubscribe = onSnapshot(docRef, {
  //         next: snapshot => {
  //           const data = snapshot.data() as EmployeesRegistersDocumentsInterface
  //           resolve(data)
  //         },
  //         error: error => {
  //           reject(error)
  //         }
  //       })

  //       unsubscribe()
  //     }
  //   )
  // }
}
