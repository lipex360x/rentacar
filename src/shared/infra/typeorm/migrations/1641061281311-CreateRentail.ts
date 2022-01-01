import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateRentail1641061281311 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentails',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'car_id',
            type: 'uuid'
          },

          {
            name: 'user_id',
            type: 'uuid'
          },

          {
            name: 'start_date',
            type: 'timestamp with time zone',
            default: 'now()'
          },

          {
            name: 'end_date',
            type: 'timestamp with time zone'
          },

          {
            name: 'expected_return_date',
            type: 'timestamp with time zone'
          },

          {
            name: 'total',
            type: 'float'
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
        ],
        foreignKeys: [
          {
            name: 'FKCarId',
            columnNames: ['car_id'],

            referencedTableName: 'cars',
            referencedColumnNames: ['id'],

            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },

          {
            name: 'FKUserId',
            columnNames: ['user_id'],

            referencedTableName: 'users',
            referencedColumnNames: ['id'],

            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentails')
  }
}
