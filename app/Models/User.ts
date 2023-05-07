import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm';
import Expense from './Expense';
import Config from '@ioc:Adonis/Core/Config';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public name: string;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @column({
    serializeAs: 'showEmailOnProfile',
    serialize: (value: number) => {
      return value === 1 ? true : false;
    },
  })
  public showEmailOnProfile: boolean;

  @column({
    serializeAs: 'aboutMe',
  })
  public aboutMe: string;

  @column({
    serializeAs: 'profileImage',
  })
  public profileImage: string;

  @computed()
  public get profileImageUrl() {
    if (!this.profileImage) {
      return null;
    }

    const endpoint = Config.get('drive.disks.s3.endpoint');
    const bucket = Config.get('drive.disks.s3.bucket');

    return `${endpoint}/${bucket}/users/${this.id}/profile-picture/${this.profileImage}`;
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Expense)
  public expenses: HasMany<typeof Expense>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
