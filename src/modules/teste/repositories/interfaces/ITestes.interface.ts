import Teste from '@modules/teste/infra/typeorm/entities/Teste.entity'

export interface CreateProps {
  data: string
}

export default interface ITestes {
  create(data: CreateProps): Promise<Teste>
}
