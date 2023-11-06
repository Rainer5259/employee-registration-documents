import { ChangeEvent } from 'react'

export interface ProfileImageProps {
  avatarURL: string
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void
}
