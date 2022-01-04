import Category from '@modules/cars/infra/typeorm/entities/Category'
import { getRepository, Repository } from 'typeorm'
import ICategories, { ICreateProps, IFindByNameProps } from '@modules/cars/repositories/interfaces/ICategories.interface'

class CategoriesRepository implements ICategories {
  private repository: Repository<Category>

  constructor () {
    this.repository = getRepository(Category)
  }

  async create ({ name, description }: ICreateProps): Promise<Category> {
    const category = this.repository.create({ name, description })

    return this.repository.save(category)
  }

  async findByName ({ name }: IFindByNameProps): Promise<Category> {
    return this.repository.findOne({ name })
  }

  async list (): Promise<Category[]> {
    return this.repository.find()
  }
}

export default CategoriesRepository
