import { MouseEventHandler } from 'react'
export interface AuthModalTypes {
  email: string
  password: string
  setEmail: (e: string) => void
  setPassword: (e: string) => void
  onPressLogin: MouseEventHandler<HTMLButtonElement> | undefined
  onPressRegister: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading: boolean
}
