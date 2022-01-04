import { v4 as uuid } from 'uuid'

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import User from './User'

@Entity('tokens')
export default class Token {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    token: string

  @Column()
    user_id: string

  @Column()
    type:string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user: User

  @CreateDateColumn()
    created_at: Date

  constructor () {
    if (!this.id) this.id = uuid()
  }
}
