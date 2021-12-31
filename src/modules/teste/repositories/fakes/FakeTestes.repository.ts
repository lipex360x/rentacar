import Teste from '@modules/teste/infra/typeorm/entities/Teste.entity'
import ITestes, { CreateProps } from '@modules/teste/repositories/interfaces/ITestes.interface'

export default class FakeTesteRepository implements ITestes {
  private repository: Teste[] = []

  async create ({ data }:CreateProps): Promise<Teste> {
    const teste = new Teste()

    Object.assign(teste, {
      data,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(teste)

    return teste
  }
}
