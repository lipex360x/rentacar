import { v4 as uuid } from 'uuid'

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    name: string

  @Column()
    password: string

  @Column()
    email: string

  @Column()
    driver_license: string

  @Column()
    isAdmin: boolean

  @Column()
    isLessee: boolean

  @Column()
    avatar: string

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
