import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export default class FkSpecificationsCars1640655700976 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'specification_id',
            type: 'uuid'
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
          }

        ]
      })
    )

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar',
        columnNames: ['specification_id'],

        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],

        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      })
    )

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKCarSpecification',
        columnNames: ['car_id'],

        referencedTableName: 'cars',
        referencedColumnNames: ['id'],

        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarSpecification')
    await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationCar')
    await queryRunner.dropTable('specifications_cars')
  }
}
