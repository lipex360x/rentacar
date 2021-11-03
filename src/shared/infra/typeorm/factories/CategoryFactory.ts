import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { Category } from '@modules/cars/entities/Category'

define(Category, (faker: typeof Faker, context: { roles: string[] }) => {
  const dateCreate = new Date()
  const category = new Category()

  Object.assign(Category, {
    category_id: faker.datatype.uuid(),
    name: faker.lorem.word,
    description: faker.lorem.word,
    created_at: dateCreate,
    updated_at: dateCreate
  })

  return category
})
