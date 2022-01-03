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
import User from './User'

@Entity('users_tokens')
export default class UserTokens {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    refresh_token: string

  @Column()
    user_id: string

  @Column()
    expires_date: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user: User

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
