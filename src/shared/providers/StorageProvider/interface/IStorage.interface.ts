export interface SaveFileProps {
  file: string
}

export interface DeleteFileProps {
  file: string
}

export default interface IStorage {
  saveFile(data: SaveFileProps): Promise<string>
  deleteFile(data: DeleteFileProps): Promise<void>
}
