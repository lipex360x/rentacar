import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm'

import Category from './Category'
import Specification from './Specification'

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
    category: Category

    @ManyToMany(() => Specification)
    @JoinTable({
      name: 'specifications_cars',
      joinColumns: [{ name: 'car_id' }],
      inverseJoinColumns: [{ name: 'specification_id' }]
    })
      specifications: Specification[]

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
