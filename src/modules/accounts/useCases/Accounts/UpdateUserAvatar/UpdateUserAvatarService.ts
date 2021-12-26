import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Accounts from '@modules/accounts/infra/typeorm/entities/Accounts'
import IAccountsRepository from '@modules/accounts/repositories/interfaces/IAccountsRepository'

interface Request{
  data: string
}

@injectable()
export default class UpdateUserAvatarService {
  constructor (
    @inject('AccountsRepository')
    private repository: IAccountsRepository
  ) {}

  async execute ({ data }: Request): Promise<Accounts> {
    // To Do
  }
}
