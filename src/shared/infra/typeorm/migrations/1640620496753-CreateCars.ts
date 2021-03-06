import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateCars1640620496753 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'brand',
            type: 'varchar'
          },

          {
            name: 'model',
            type: 'varchar'
          },

          {
            name: 'license_plate',
            type: 'varchar'
          },

          {
            name: 'description',
            type: 'varchar'
          },

          {
            name: 'daily_rate',
            type: 'numeric'
          },

          {
            name: 'fine_amount',
            type: 'numeric'
          },

          {
            name: 'available',
            type: 'boolean',
            default: true
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
    await queryRunner.dropTable('cars')
  }
}
