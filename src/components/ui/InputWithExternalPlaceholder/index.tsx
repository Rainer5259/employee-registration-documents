import { FC } from 'react'
import { InputWithExternalPlaceholderProps } from './types'
import styles from './inputWithExternalPlaceholder.module.sass'

const InputWithExternalPlaceholder: FC<InputWithExternalPlaceholderProps> = ({
  externalPlaceholder,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <input {...rest} />
      <text className={styles.externalPlaceholder}>{externalPlaceholder}</text>
    </div>
  )
}

export default InputWithExternalPlaceholder
