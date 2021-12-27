import { v4 as uuid } from 'uuid'
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Faker from 'faker'

import User from '@modules/accounts/infra/typeorm/entities/User'

export default class CreateAdminUser implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuid(),
          name: 'admin',
          email: 'admin@user.com',
          password: 'root',
          driver_license: Faker.lorem.slug(),
          isAdmin: true
        }
      ])
      .execute()
  }
}
