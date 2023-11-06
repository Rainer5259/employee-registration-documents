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
            className={styles.inputGroup}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.inputGroup}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <div className={styles.buttonBox}>
            <Button
              onClick={onPressLogin}
              isLoading={isLoading}
              className={styles.button}
            >
              <text>{t('COMPONENTS.AUTH_MODAL.SIGN_IN')}</text>
            </Button>
            <Button
              onClick={onPressRegister}
              isLoading={isLoading}
              className={styles.buttonTransparent}
            >
              <text>{t('COMPONENTS.AUTH_MODAL.SIGN_UP')}</text>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
