import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateCarImages1640730489011 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_images',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'image',
            type: 'varchar'
          },

          {
            name: 'car_id',
            type: 'uuid'
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
            name: 'FKCarOnCarsImages',
            columnNames: ['car_id'],

            referencedTableName: 'cars',
            referencedColumnNames: ['id'],

            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_images')
  }
}
