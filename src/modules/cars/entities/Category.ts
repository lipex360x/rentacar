import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  DeleteDateColumn
} from 'typeorm'

@Entity('categorys')
export class Category {
  @PrimaryColumn('uuid')
    category_id?: string

  @Column()
    name: string

  @Column()
    description: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  @BeforeInsert()
  categoryProps (): void {
    this.category_id = uuid()
  }
}
