import { t } from 'i18next'
import { Button } from '../../components/ui/Button'
import { FC } from 'react'
import styles from './header.module.sass'
import logoIcon from '../../assets/svg/logo-header.svg'
import homeIcon from '../../assets/svg/home.svg'

const Header = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logoBox}>
          <img src={logoIcon} />
        </div>

        <div className={styles.contentCenter}>
          <text className={styles.stepText}>Passo</text>
          <text>Contato</text>
        </div>

        <div className={styles.homeBox}>
          <Button className={styles.homeButton}>
            <img src={homeIcon} className={styles.homeImage} />
          </Button>
        </div>
      </div>
      <div className={styles.bar} />
    </div>
  )
}

export default Header
