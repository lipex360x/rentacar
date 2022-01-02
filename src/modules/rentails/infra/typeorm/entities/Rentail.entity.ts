import { v4 as uuid } from 'uuid'

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import Car from '@modules/cars/infra/typeorm/entities/Car'

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

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
    car: Car

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
