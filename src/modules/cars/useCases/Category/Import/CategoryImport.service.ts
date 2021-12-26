import Category from '@modules/cars/infra/typeorm/entities/Category'
import ICategoriesRepositoryProps from '@modules/cars/repositories/interfaces/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

import { readCsv } from '@shared/utils/csvFiles'
import { deleteFile } from '@shared/utils/multerFiles'

interface IRequestProps {
  file: Express.Multer.File
}

@injectable()
class CategoryImportService {
  constructor (
    @inject('CategoriesRepository')
    private repository: ICategoriesRepositoryProps) {}

  async execute ({ file }:IRequestProps): Promise<Number> {
    const categories = await readCsv({ path: file.path, delimiter: ';', firstLine: false })

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
