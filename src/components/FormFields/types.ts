import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Employees, InputType } from '../../utils/types'

export interface FormFieldsProps extends Employees {
  handleFormatInput: (
    onChangeText: string,
    type: InputType,
    callback: (formatedValue: string) => void
  ) => void
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void
  setName: Dispatch<SetStateAction<string>>
  setLastName: Dispatch<SetStateAction<string>>
  setGender: Dispatch<SetStateAction<string>>
  setAddress: Dispatch<SetStateAction<string>>
  setPhoneNumber: Dispatch<SetStateAction<string>>
  setBirthDate: Dispatch<SetStateAction<string>>
  setAvatarURL: Dispatch<SetStateAction<string>>
  setBiography: Dispatch<SetStateAction<string>>
  setOffice: Dispatch<SetStateAction<string>>
  setIssueDate: Dispatch<SetStateAction<string>>
  setSector: Dispatch<SetStateAction<string>>
  setSalary: Dispatch<SetStateAction<string>>
}
