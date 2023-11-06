import React, { useEffect } from 'react'
import { FormEvent, useState } from 'react'
import styles from './login.module.sass'
import { AuthModal } from '../../components/AuthModal/index'
import { t } from 'i18next'
import { AuthErrorCodes, User } from 'firebase/auth'
import { toast } from 'react-toastify'
import { FirebaseError } from 'firebase/app'
import { AuthErrorCodesCustom } from '../../utils/AuthErrorCodesCustom'
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/Api/user.service'
import { setToken, setUser } from '../../redux/slices/authenticateUser'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../redux/store'
import CryptoJS from 'crypto-js'

export default function AuthenticationScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const token = useSelector((state: RootState) => state.authenticateUser.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    if (!email || !password) {
      return toast.error(t('SCREENS.AUTHENTICATION.ERRORS.FILL_FIELDS'))
    }

    try {
      const user = await UserService.signUpUser(email, password)
      if (user) {
        setEmail('')
        setPassword('')
        dispatch(setToken(await user.getIdToken()))
        dispatch(setUser(user))
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
          toast.error(t('SCREENS.AUTHENTICATION.ERRORS.INVALID_EMAIL'))
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

    if (!email || !password) {
      return toast.error(t('SCREENS.AUTHENTICATION.ERRORS.FILL_FIELDS'))
    }

    try {
      const user = await UserService.signInUser(email, password)

      if (user) {
        const userConvertedToString = JSON.stringify(user)
        const encryptedData = CryptoJS.AES.encrypt(
          userConvertedToString,
          'storagedUser'
        ).toString()
        localStorage.setItem('encryptedUserData', encryptedData)
        const refreshToken = parseInt(
          (await user.getIdTokenResult()).expirationTime
        )
        Cookies.set('authFirebaseToken', user.refreshToken, {
          expires: refreshToken
        })
        toast.success(t('GENERICS.WELCOME'))
        dispatch(setToken(user.refreshToken))
        dispatch(setUser(user))
        navigate('/home')

        return
      }
    } catch (e) {
      const error = e as FirebaseError

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

  useEffect(() => {
    const loginWithStoredToken = async () => {
      const authFirebaseToken = Cookies.get('authFirebaseToken')

      if (authFirebaseToken) {
        const storedUser = localStorage.getItem('encryptedUserData')
        if (storedUser) {
          const decryptedData = CryptoJS.AES.decrypt(
            storedUser,
            'storagedUser'
          ).toString(CryptoJS.enc.Utf8)
          const decryptedUserData: User = JSON.parse(decryptedData)
          dispatch(setUser(decryptedUserData))
          dispatch(setToken(authFirebaseToken))
        }
      }
    }

    loginWithStoredToken()
  }, [!token])

  return (
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
  )
}
