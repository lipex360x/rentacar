import { instanceToInstance } from 'class-transformer'

import User from '@modules/accounts/infra/typeorm/entities/User.entity'

export default class UserMap {
  static response ({ email, name, id, avatar, driver_license, avatar_url }: User) {
    return instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    })
  }
}
