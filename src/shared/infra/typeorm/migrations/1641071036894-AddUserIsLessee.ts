import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddUserIsLessee1641071036894 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'isLessee',
      type: 'boolean',
      default: false
    })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isLessee')
  }
}
