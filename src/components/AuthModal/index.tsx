import React from 'react'
import { FC, useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import styles from './authModal.module.sass'
import { AuthModalTypes } from './types'
import { useTranslation } from 'react-i18next'
import i18n from '~/i18n'

export const AuthModal: FC<AuthModalTypes> = ({
  email,
  password,
  setEmail,
  setPassword,
  onPressLogin,
  onPressRegister
}) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    i18n
  }, [])
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <form id="login">
        <div className={styles.inputContainer}>
          <Input
            type="email"
            placeholder="Email"
            className={styles.inputContainer}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            placeholder="Password"
            className={styles.inputContainer}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button loading={loading}>
            <text>{t('COMPONENTS.AUTH_MODAL.SIGN_IN')}</text>
          </Button>
          <Button loading={loading}>
            <text>{t('COMPONENTS.AUTH_MODAL.SIGN_UP')}</text>
          </Button>
        </div>
      </form>
    </div>
  )
}
