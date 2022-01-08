import User from '@modules/accounts/infra/typeorm/entities/User.entity'

export default class UserMap {
  static response ({ email, name, id, avatar, driver_license }: User) {
    return { email, name, id, avatar, driver_license }
  }
}
