import ICsv, { WriteProps, ReadProps } from '../interface/ICsv.interface'

export default class FakeCsvProvider implements ICsv {
  private repository: any[] = []

  async write ({ path, data, delimiter = ';', headers = true }:WriteProps): Promise<number> {
    data.forEach(line => {
      this.repository.push(line)
    })

    return data.length
  }

  async read ({ path, delimiter = ';', firstLine = true }:ReadProps): Promise<any[]> {
    return this.repository
  }
}
