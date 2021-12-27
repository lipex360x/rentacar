import { v4 as uuid } from 'uuid'
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Category from '@modules/cars/infra/typeorm/entities/Category'

export default class CreateCategory implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        { id: uuid(), name: 'Teste Seed', description: 'Description Seed' }
      ])
      .execute()
  }
}
