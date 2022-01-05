import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateTokens1641252950311 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'user_id',
            type: 'uuid'
          },

          {
            name: 'token',
            type: 'varchar'
          },

          {
            name: 'type',
            type: 'varchar'
          },

          {
            name: 'expire_date',
            type: 'timestamp with time zone'
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ],

        foreignKeys: [
          {
            name: 'FKUserId',
            columnNames: ['user_id'],

            referencedTableName: 'users',
            referencedColumnNames: ['id'],

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens_forgot')
  }
}
