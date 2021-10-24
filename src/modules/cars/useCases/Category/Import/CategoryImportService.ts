
interface IRequestProps{
  file: any
}

class CategoryImportService {
  execute ({ file }:IRequestProps): void {
    console.log(file)
  }
}

export { CategoryImportService }
