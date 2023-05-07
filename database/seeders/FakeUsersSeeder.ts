import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import UserFactory from 'Database/factories/UserFactory';

export default class FakeUsersSeeder extends BaseSeeder {
  public async run() {
    await UserFactory.create();
  }
}
