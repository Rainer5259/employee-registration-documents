import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: ReactNode
}

export function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <button {...props} disabled={loading}>
      {loading ? <FaSpinner color="#FFF" size={16} /> : <a>{children}</a>}
    </button>
  )
}
