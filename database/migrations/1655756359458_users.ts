import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('email', 255).notNullable();
      table.string('name', 180).notNullable();
      table.string('username', 40).notNullable();
      table.string('password', 180).notNullable();
      table.boolean('show_email_on_profile').notNullable().defaultTo(true);
      table.string('about_me', 255).nullable();
      table.string('profile_image', 255).nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
