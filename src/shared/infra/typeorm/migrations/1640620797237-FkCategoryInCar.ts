import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export default class FkCategoryInCar1640620797237
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cars',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'cars',
      new TableForeignKey({
        name: 'FK_categories_to_cars',
        columnNames: ['category_id'],

        referencedTableName: 'categories',
        referencedColumnNames: ['id'],

        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cars', 'FK_categories_to_cars')
    await queryRunner.dropColumn('cars', 'category_id')
  }
}
