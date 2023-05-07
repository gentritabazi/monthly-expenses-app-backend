import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'categories';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.string('name').notNullable();

      /**
       * Foreign key constraints
       */
      table.foreign('user_id').references('users.id');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
