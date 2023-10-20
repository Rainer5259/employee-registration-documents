import React from 'react'
import { FormEvent, useState } from 'react'
import { Input } from '~/components/ui/Input'
import styles from './login.module.sass'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault()
    if (email === '' || password === '') {
      console.log('Preencha todos os campos !')
      return
    }
  }

  return (
    <div className={styles.container}>
      <form id="login" onSubmit={handleSignUp}>
        <Input
          type="email"
          placeholder="Email"
          className={styles.inputContainer}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className={styles.inputContainer}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" id="login" className={styles.buttonContainer} />
      </form>
    </div>
  )
}
