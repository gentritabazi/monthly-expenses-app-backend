import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public name: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
