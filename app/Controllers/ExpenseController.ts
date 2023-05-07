import ControllerBase from 'App/Abstracts/ControllerBase';
import Expense from 'App/Models/Expense';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PayController extends ControllerBase {
  public async index({ auth }: HttpContextContract) {
    const userId = auth.user?.id || 0;

    const data = await Expense.query().where('user_id', userId).preload('category');

    return data;
  }
}
