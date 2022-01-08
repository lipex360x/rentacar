import { v4 as uuid } from 'uuid'

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

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

  @Column({ default: false })
    isLessee: boolean

  @Column({ nullable: true })
    avatar: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  @Expose({ name: 'avatar_url' })
  avatar_url (): string {
    switch (process.env.DISK_STORAGE) {
      case 'local':
        return `${process.env.API_URL}:${process.env.API_PORT}/files/${this.avatar}`
      case 'S3':
        return `${process.env.AWS_S3_BUCKET_URL}/${this.avatar}`
      default:
        return null
    }
  }

  constructor () {
    if (!this.id) this.id = uuid()
  }
}
