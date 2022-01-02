import Category from '@modules/cars/infra/typeorm/entities/Category'
import ICategoriesRepositoryProps from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

import { deleteFile } from '@shared/utils/multerFiles'
import ICsvProvider from '@shared/providers/CsvProvider/interface/ICsv.interface'

interface IRequestProps {
  file: Express.Multer.File
}

@injectable()
class CategoryImportService {
  constructor (
    @inject('CsvProvider')
    private csvProvider: ICsvProvider,

    @inject('CategoriesRepository')
    private repository: ICategoriesRepositoryProps) {}

  async execute ({ file }:IRequestProps): Promise<Number> {
    const categories = await this.csvProvider.read({ path: file.path, delimiter: ';', firstLine: false })

    await deleteFile({ fileName: `./tmp/${file.filename}` })

    for (const category of categories) {
      const { name, description } = category

      const setCategory = new Category()

      Object.assign(setCategory, {
        name, description
      })

      const getCategory = await this.repository.findByName({ name })

      if (!getCategory) await this.repository.create(setCategory)
    }

    return categories.length
  }
}

export default CategoryImportService
