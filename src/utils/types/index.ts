import { Promotion } from '../enums/promotion'

export interface EmployeesRegistersDocumentsInterface {
  uid: string
  employee: Employees
  updatesHistory?: Employees[]
  promotion?: Promotion | null
}

export interface Employees {
  name: string
  lastName: string
  avatarURL: string
  biography: string
  gender: string
  office: string
  sector: string
  salary: string
  issueDate: string
  address: string
  phoneNumber: string
  birthDate: string
  roundedAvatar?: boolean | false
  timestamp?: timestamp
}

export interface timestamp {
  updated?: Date
  created?: Date
}

export type StorageFileType = Uint8Array | null

export interface UserCustom {
  email: string
}

export type InputType = 'date' | 'phoneNumber' | 'BRLcurrency'
