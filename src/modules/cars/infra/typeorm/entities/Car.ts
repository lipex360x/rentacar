import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'

import Category from './Category'

@Entity('cars')
export default class Car {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    brand: string

  @Column()
    model: string

  @Column()
    license_plate: string

  @Column()
    description: string

  @Column()
    daily_rate: number

  @Column()
    fine_amount: number

  @Column()
    category_id: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
    category?: Category

  @Column()
    available: boolean

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  constructor () {
    if (!this.id) this.id = uuid()
    this.available = true
  }
}
