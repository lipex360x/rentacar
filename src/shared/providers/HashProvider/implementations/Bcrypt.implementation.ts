import { hash, compare } from 'bcryptjs'
import IHash from '../interface/IHash.interface'

export default class BCryptHashProvider implements IHash {
  public async generateHash (payload?: string): Promise<string> {
    return hash(payload || new Date(Math.random() * 100).toString(), 10)
  }

  public async compareHash (payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
