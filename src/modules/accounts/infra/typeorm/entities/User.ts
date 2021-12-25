import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn
} from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryColumn('uuid')
    user_id: string

  @Column()
    name: string

  @Column({ select: false })
    password: string

  @Column()
    email: string

  @Column()
    driver_license: string

  @Column()
    isAdmin: boolean

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  constructor () {
    if (!this.user_id) this.user_id = uuid()
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword (): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8)
  }
}
