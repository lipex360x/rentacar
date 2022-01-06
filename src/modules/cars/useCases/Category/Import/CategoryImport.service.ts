import Category from '@modules/cars/infra/typeorm/entities/Category'
import ICategories from '@modules/cars/repositories/interfaces/ICategories.interface'
import { inject, injectable } from 'tsyringe'

import ICsvProvider from '@shared/providers/CsvProvider/interface/ICsv.interface'
import AppError from '@shared/errors/AppError'

interface IRequestProps {
  file: {
    buffer: {}
  }
}

@injectable()
class CategoryImportService {
  constructor (
    @inject('CsvProvider')
    private csvProvider: ICsvProvider,

    @inject('CategoriesRepository')
    private repository: ICategories) {}

  async execute ({ file }:IRequestProps): Promise<number> {
    const categories = await this.csvProvider.read({
      file,
      delimiter: ';'
    })

    for (const category of categories) {
      const { name, description } = category

      if (!name || !description) throw new AppError('Invalid CSV')

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
