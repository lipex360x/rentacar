import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateUsersToken1641168170999 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'refresh_token',
            type: 'varchar'
          },

          {
            name: 'user_id',
            type: 'uuid'
          },

          {
            name: 'expires_date',
            type: 'timestamp with time zone'
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
            name: 'FkUserId',
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
    await queryRunner.dropTable('users_tokens')
  }
}
