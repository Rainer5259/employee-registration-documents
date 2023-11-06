import { t } from 'i18next'
import { Button } from '../../components/ui/Button'
import { FC } from 'react'
import styles from './header.module.sass'
import logoIcon from '../../assets/svg/logo-header.svg'
import homeIcon from '../../assets/svg/home.svg'
import { useNavigate } from 'react-router-dom'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate()

  const navigateToHome = () => {
    navigate('/home')
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.containerLeftContent}>
          <div className={styles.logoBox}>
            <img src={logoIcon} />
          </div>

          <div className={styles.contentCenter}>
            <text className={styles.stepText}>
              {t('COMPONENTS.HEADER.STEP', {
                step1: '1',
                step2: '1'
              })}
            </text>
            <text>{t('COMPONENTS.HEADER.TITLE')}</text>
          </div>
        </div>
        <div className={styles.homeBox}>
          <Button className={styles.homeButton} onClick={navigateToHome}>
            <img src={homeIcon} className={styles.homeImage} />
          </Button>
        </div>
      </div>
      <div className={styles.bar} />
    </div>
  )
}

export default Header
