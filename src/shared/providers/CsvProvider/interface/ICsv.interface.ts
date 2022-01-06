export interface WriteProps {
  path: string
  data: any[]
  delimiter?: ',' | ';'
  headers?: boolean
}

export interface ReadProps {
  file: { buffer: {} }
  delimiter?: ',' | ';'
  show_header?: boolean
}

export default interface ICsv {
  write(data: WriteProps): Promise<number>
  read(data: ReadProps): Promise<any[]>
}
