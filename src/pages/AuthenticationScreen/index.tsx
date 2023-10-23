import React, { useEffect } from 'react'
import { FormEvent, useState } from 'react'
import styles from './login.module.sass'
import { AuthModal } from '../../components/AuthModal/index'
import { t } from 'i18next'
import { AuthErrorCodes } from 'firebase/auth'
import { toast } from 'react-toastify'
import { FirebaseError } from 'firebase/app'
import { AuthErrorCodesCustom } from '../../utils/AuthErrorCodesCustom'
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/Api/user.service'
import { setToken } from '../../redux/slices/authenticateUser'

export default function AuthenticationScreen() {
  const [email, setEmail] = useState('o@email.com')
  const [password, setPassword] = useState('123123')
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {}, [])

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    if (email === '' || password === '') {
      throw toast.error(t('SCREENS.AUTHENTICATION.ERRORS.FILL_FIELD'))
    }
    try {
      const user = await UserService.signUpUser(email, password)

      if (user) {
        setEmail('')
        setPassword('')
        setToken(user.refreshToken)
        console.log('my refresh token', user.refreshToken)
        navigate('/dashboard')
        return toast.success(
          t('SCREENS.AUTHENTICATION.SUCCESS.USER_REGISTERED')
        )
      }
    } catch (e) {
      const error = e as FirebaseError

      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          toast.error(t('SCREENS.AUTHENTICATION.ERRORS.USER_EXIST'))
          setEmail('')
          break

        case AuthErrorCodes.INVALID_EMAIL:
          toast.error(t('SCREENS.AUTHENTICATION.ERRORS.USER_EXIST'))
          break

        default:
          toast.error(t('ERRORS.HAS_OCURRED'))
          break
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const user = await UserService.signInUser(email, password)
      if (user) {
        toast.success(t('GENERICS.WELCOME'))
        return
      }
    } catch (e) {
      const error = e as FirebaseError

      console.log(error.code)
      switch (error.code) {
        case AuthErrorCodesCustom.INVALID_CREDENTIALS:
          toast.error(t('SCREENS.AUTHENTICATION.ERRORS.INVALID_CREDENTIALS'))
          break
        case AuthErrorCodesCustom.TOO_MANY_ATTEMPTS_TRY_LATER:
          toast.error(
            t('SCREENS.AUTHENTICATION.ERRORS.TOO_MANY_ATTEMPTS_TRY_LATER')
          )
          break

        default:
          toast.error(t('ERRORS.HAS_OCURRED'))
          break
      }
    }
  }
  return (
    <body>
      <div className={styles.container}>
        <AuthModal
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onPressLogin={handleLogin}
          onPressRegister={handleSignUp}
          isLoading={isLoading}
        />
      </div>
    </body>
  )
}
