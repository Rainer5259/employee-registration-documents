import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: ReactNode
}

export function Button({ isLoading, children, ...props }: ButtonProps) {
  return (
    <button {...props} disabled={isLoading}>
      {isLoading ? <FaSpinner color="#FFF" size={16} /> : <a>{children}</a>}
    </button>
  )
}
