import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Category from './Category';

export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public categoryId: number;

  @column()
  public note: string;

  @column()
  public amount: string;

  @column()
  public date: string;

  @column()
  public location: string;

  @column()
  public merchant: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;
}
