import { MouseEventHandler } from 'react'
import { ButtonProps } from '../ui/Button/types'

export interface footerButtonsProps extends ButtonProps {
  onPressLeft: MouseEventHandler<HTMLButtonElement> | undefined
  onPressRight: MouseEventHandler<HTMLButtonElement> | undefined
}
