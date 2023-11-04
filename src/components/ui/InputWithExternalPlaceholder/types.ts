import { InputHTMLAttributes } from 'react'

export interface InputWithExternalPlaceholderProps
  extends InputHTMLAttributes<HTMLInputElement> {
  externalPlaceholder?: string
}
