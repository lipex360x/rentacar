import fs from 'fs'
import csvParse from 'csv-parse'
import { Category } from '@modules/cars/entities/Category'
import { ICategoriesRepositoryProps } from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface IRequestProps {
  file: Express.Multer.File
}

interface IImportCategoryProps {
  name: string
  description: string
}

@injectable()
class CategoryImportService {
  constructor (
    @inject('CategoriesRepository')
    private repository: ICategoriesRepositoryProps) {}

  private loadFile ({ file }:IRequestProps): Promise<IImportCategoryProps[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path, { encoding: 'binary' })

      const categories: IImportCategoryProps[] = []

      const parseFile = csvParse({ delimiter: ';' })

      stream.pipe(parseFile)

      parseFile.on('data', async (line) => {
        const [name, description] = line
        categories.push({ name, description })
      }).on('end', () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      }).on('error', (error) => {
        reject(error)
      })
    })
  }

  async execute ({ file }:IRequestProps): Promise<void> {
    const categories = await this.loadFile({ file })

    let firstLine = true

    for (const category of categories) {
      if (firstLine) {
        firstLine = false
        continue
      }
      const { name, description } = category

      const setCategory = new Category()

      Object.assign(setCategory, {
        name, description
      })

      const getCategory = await this.repository.findByName({ name })

      if (!getCategory) await this.repository.create(setCategory)
    }
  }
}

export { CategoryImportService }
