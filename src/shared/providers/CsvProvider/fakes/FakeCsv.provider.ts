import ICsv, { WriteProps } from '../interface/ICsv.interface'

export default class FakeCsvProvider implements ICsv {
  private repository: any[] = []

  async write ({ data }:WriteProps): Promise<number> {
    data.forEach(line => {
      this.repository.push(line)
    })

    return data.length
  }

  async read (): Promise<any[]> {
    return this.repository
  }
}
