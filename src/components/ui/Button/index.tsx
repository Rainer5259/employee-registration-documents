import { FaSpinner } from 'react-icons/fa'
import { ButtonProps } from './types'

const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  return (
    <button disabled={isLoading} {...props}>
      {isLoading ? <FaSpinner color="#FFF" size={16} /> : <a>{children}</a>}
    </button>
  )
}
export { Button }
