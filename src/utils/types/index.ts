export interface EmployeesRegistersDocumentsInterface {
  uid: string
  employee: Employees
  updatesHistory?: Employees[]
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
  timestamp: {
    updated?: Date
    created?: Date
  }
}

export type StorageFileType = Uint8Array | null

export interface UserCustom {
  email: string
}

export type InputType = 'date' | 'phoneNumber' | 'BRLcurrency'
