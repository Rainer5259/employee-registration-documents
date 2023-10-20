import React from 'react'
import { FormEvent, useEffect, useState } from 'react'
import { Input } from '~/components/ui/Input'
import styles from './register.module.sass'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app, authFirebaseService } from '~/services/firebase'
import { AuthModal } from '~/components/AuthModal'
// import * as FIREBASEENV from '@env.'
export default function Register() {
  const [email, setEmail] = useState('e@email.com')
  const [password, setPassword] = useState('123123')
  // const {
  //   API_KEY,
  //   AUTH_DOMAIN,
  //   MEASUREMENT_ID,
  //   APP_ID,
  //   MESSAGING_SENDER_ID,
  //   PROJECT_ID,
  //   STORAGE_BUCKET
  // } = FIREBASEENV
  // console.log(
  //   API_KEY,
  //   AUTH_DOMAIN,
  //   PROJECT_ID,
  //   STORAGE_BUCKET,
  //   MESSAGING_SENDER_ID,
  //   APP_ID,
  //   MEASUREMENT_ID
  // )
  useEffect(() => {}, [])
  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault()
    console.log('aaaa')
    try {
      const user = await createUserWithEmailAndPassword(
        authFirebaseService,
        email,
        password
      )
      console.log(user)
    } catch (e) {
      console.log(e)
    }

    if (email === '' || password === '') {
      console.log('Preencha todos os campos !')
      return
    }
  }
  return (
    <div className={styles.container}>
      <AuthModal
        email={email}
        password={password}
        onPressLogin={() => {}}
        onPressRegister={() => {}}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  )
}
