import { t } from 'i18next'
import { Button } from '../../components/ui/Button'
import { FC } from 'react'
import { footerButtonsProps } from './types'
import styles from './footerButtons.module.sass'

const FooterButtons: FC<footerButtonsProps> = ({
  isLoading,
  onPressLeft,
  onPressRight
}) => {
  return (
    <div className={styles.container}>
      <Button
        isLoading={isLoading}
        className={styles.buttonWithoutBackground}
        onClick={onPressLeft}
      >
        <text>{'< '}</text>
        {t('SCREENS.DASHBOARD.BUTTON.PREVIOUS')}
      </Button>
      <Button
        isLoading={isLoading}
        className={styles.buttonWithBackground}
        onClick={onPressRight}
      >
        {t('SCREENS.DASHBOARD.BUTTON.NEXT')}
      </Button>
    </div>
  )
}

export default FooterButtons
