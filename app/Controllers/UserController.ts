import ControllerBase from 'App/Abstracts/ControllerBase';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserController extends ControllerBase {
  public async updateMe({ auth, request, response }: HttpContextContract) {
    if (!auth.user) {
      return response.status(422).json({ error: 'Please login first!' });
    }

    const validationSchema = schema.create({
      name: schema.string.optional({ trim: true }, [rules.maxLength(180)]),
      username: schema.string.optional({}, [
        rules.regex(new RegExp('^[a-zA-Z0-9]+$')),
        rules.maxLength(40),
        rules.unique({ table: 'users', column: 'username', whereNot: { id: auth.user.id } }),
      ]),
    });

    const payload = await request.validate({ schema: validationSchema });
    const loggedUser = await User.findOrFail(auth.user.id);
    const payloadToUpdate = {
      name: payload.name,
      username: payload.username?.trim(),
    };

    loggedUser.merge(payloadToUpdate);
    loggedUser.save();

    return this.jsonOk();
  }

  public async getMe({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response
        .status(this.statusCodeUnprocessableEntity)
        .json({ error: 'Please login first!' });
    }

    return await User.query().where('id', auth.user.id).first();
  }

  public async getTop6() {
    return await User.query().orderBy('id', 'desc').limit(6);
  }

  public async getByUserName({ params }: HttpContextContract) {
    return await User.query().where('username', params.username).firstOrFail();
  }
}
