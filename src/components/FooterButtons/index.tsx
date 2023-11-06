import { t } from 'i18next'
import { Button } from '../../components/ui/Button'
import { FC } from 'react'
import { footerButtonsProps } from './types'
import styles from './footerButtons.module.sass'

const FooterButtons: FC<footerButtonsProps> = ({
  isLoading,
  onPressRight,
  text
}) => {
  return (
    <div className={styles.container}>
      <Button
        isLoading={isLoading}
        className={styles.buttonWithBackground}
        onClick={onPressRight}
      >
        {text}
      </Button>
    </div>
  )
}

export default FooterButtons
