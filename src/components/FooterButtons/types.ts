import { MouseEventHandler } from 'react'
import { ButtonProps } from '../ui/Button/types'

export interface footerButtonsProps extends ButtonProps {
  onPressRight: MouseEventHandler<HTMLButtonElement> | undefined
  text?: string
}
