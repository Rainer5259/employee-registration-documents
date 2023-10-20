import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input({ ...rest }: InputProps) {
  return <input {...rest}></input>
}
export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea {...rest}></textarea>
}
