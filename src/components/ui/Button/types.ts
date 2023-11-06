import { ButtonHTMLAttributes, ChangeEvent, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children?: ReactNode
  onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void
  input?: HTMLInputElement
}
