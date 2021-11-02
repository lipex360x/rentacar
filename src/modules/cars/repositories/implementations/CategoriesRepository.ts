import { Category } from '@modules/cars/entities/Category'
import { getRepository, Repository } from 'typeorm'
import { ICategoriesRepositoryProps, ICreateProps, IFindByNameProps } from '../interfaces/ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepositoryProps {
  private repository: Repository<Category>

  constructor () {
    this.repository = getRepository(Category)
  }

  async create ({ name, description }: ICreateProps): Promise<void> {
    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category)
  }

  async findByName ({ name }: IFindByNameProps): Promise<Category> {
    const getCategory = this.repository.findOne({ name })

    return getCategory
  }

  async list (): Promise<Category[]> {
    const category = await this.repository.find()
    return category
  }
}

export { CategoriesRepository }
