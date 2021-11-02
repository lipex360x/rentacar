import { Category } from '@modules/cars/entities/Category'
import { getRepository, Repository } from 'typeorm'
import { ICategoriesRepositoryProps, ICreateProps, IFindByNameProps } from '../interfaces/ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepositoryProps {
  private repository: Repository<Category>

  constructor () {
    this.repository = getRepository(Category)
  }

  async create ({ name, description }: ICreateProps): Promise<void> {
    const category = this.repository.create({ name, description })

    await this.repository.save(category)
  }

  async findByName ({ name }: IFindByNameProps): Promise<Category> {
    return this.repository.findOne({ name })
  }

  async list (): Promise<Category[]> {
    return this.repository.find()
  }
}

export { CategoriesRepository }
