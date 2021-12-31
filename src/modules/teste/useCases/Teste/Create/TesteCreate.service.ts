import { inject, injectable } from 'tsyringe'
// import AppError from '@shared/errors/AppError'

import Teste from '@modules/teste/infra/typeorm/entities/Teste.entity'
import ITestes from '@modules/teste/repositories/interfaces/ITestes.interface'

interface Request{
  data: string
}

@injectable()
export default class TesteCreateService {
  constructor (
    @inject('TestesRepository')
    private repository: ITestes
  ) {}

  async execute ({ data }: Request): Promise<Teste> {
    // To Do
  }
}
