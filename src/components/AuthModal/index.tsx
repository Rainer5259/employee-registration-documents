import React from 'react'
import { FC } from 'react'
import styles from './authModal.module.sass'
import { AuthModalTypes } from './types'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

export const AuthModal: FC<AuthModalTypes> = ({
  email,
  password,
  setEmail,
  setPassword,
  onPressLogin,
  onPressRegister,
  isLoading
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <img src={require('../../assets/png/taugor-logo.png')} />
      </div>
      <form id="login">
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputContainer}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.inputContent}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.buttonBox}>
          <Button onClick={onPressLogin} isLoading={isLoading}>
            <p>{t('COMPONENTS.AUTH_MODAL.SIGN_IN')}</p>
          </Button>
          <Button onClick={onPressRegister} isLoading={isLoading}>
            <p>{t('COMPONENTS.AUTH_MODAL.SIGN_UP')}</p>
          </Button>
        </div>
      </form>
    </div>
  )
}
