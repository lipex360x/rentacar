export interface WriteProps {
  path: string
  data: any[]
  delimiter?: ',' | ';'
  headers?: boolean
}

export interface ReadProps {
  path: string
  delimiter?: ',' | ';'
  firstLine?: boolean
}

export default interface ICsvProvider {
  write(data: WriteProps): Promise<boolean>
  read(data: ReadProps): Promise<any[]>
}
