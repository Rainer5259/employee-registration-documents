import { t } from 'i18next'
import { Button } from '../../components/ui/Button'
import { FC } from 'react'
import { AddEmployeeProps } from './types'

const AddEmployee: FC<AddEmployeeProps> = ({ isLoading, ...buttonProps }) => {
  return (
    <Button isLoading={isLoading} {...buttonProps}>
      {t('SCREENS.DASHBOARD.BUTTON.ADD')}
    </Button>
  )
}

export default AddEmployee
