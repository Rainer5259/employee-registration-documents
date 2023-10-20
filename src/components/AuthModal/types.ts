export interface AuthModalTypes {
  email: string
  password: string
  setEmail: (e: string) => void
  setPassword: (e: string) => void
  onPressLogin: () => void
  onPressRegister: () => void
}
