import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'expenses';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.string('amount').notNullable();
      table.string('note').nullable();
      table.string('date').nullable();
      table.bigInteger('location').nullable();
      table.bigInteger('merchant').nullable();

      /**
       * Foreign key constraints
       */
      table.foreign('user_id').references('users.id');
      table.foreign('category_id').references('categories.id');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
