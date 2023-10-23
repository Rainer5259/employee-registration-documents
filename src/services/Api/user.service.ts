import { User } from 'firebase/auth'
import { Api } from '.'

class UserService extends Api {
  async signInUser(email: string, password: string): Promise<User> {
    const data = await this.signInWithEmailAndPassword(email, password)
    return data
  }

  async signInWithToken(token: string): Promise<User> {
    const data = await this.signInWithCustomToken(token)
    return data
  }

  async signUpUser(email: string, password: string): Promise<User> {
    const data = await this.signUpWithEmailAndPassword(email, password)
    return data
  }
}

export default new UserService()
