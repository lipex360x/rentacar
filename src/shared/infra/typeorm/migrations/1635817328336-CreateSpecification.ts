import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateSpecification1635817328336 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'name',
            type: 'varchar'
          },

          {
            name: 'description',
            type: 'varchar'
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },

          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },

          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
            default: null
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('specifications')
  }
}
