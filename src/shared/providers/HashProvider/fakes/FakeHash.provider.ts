import IHash from '../interface/IHash.interface'

class FakeHashProvider implements IHash {
  public async generateHash (payload?: string): Promise<string> {
    return payload || new Date().toString()
  }

  public async compareHash (payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}

export default FakeHashProvider
