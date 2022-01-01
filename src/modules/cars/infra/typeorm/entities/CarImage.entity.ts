import { v4 as uuid } from 'uuid'

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'

@Entity('cars_images')
export default class CarImage {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    image: string

  @Column()
    car_id: string

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
