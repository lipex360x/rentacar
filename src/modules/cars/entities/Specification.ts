import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert
} from 'typeorm'

@Entity('specifications')
export class Specification {
  @PrimaryColumn('uuid')
    specification_id?: string

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
  specificationProps (): void {
    this.specification_id = uuid()
  }
}
