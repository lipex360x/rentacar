import { v4 as uuid } from 'uuid'

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'

@Entity('rentails')
export default class Rentail {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    car_id: string

  @Column()
    user_id: string

  @Column()
    start_date: Date

  @Column()
    end_date: Date

  @Column()
    expected_return_date: Date

  @Column()
    total: number

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
