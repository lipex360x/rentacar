import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'

@Entity('specifications')
export default class Specification {
  @PrimaryColumn('uuid')
    id?: string

  @Column()
    name: string

  @Column()
    description: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  constructor () {
    if (!this.id) this.id = uuid()
  }
}
