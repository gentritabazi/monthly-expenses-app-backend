import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import ControllerBase from 'App/Abstracts/ControllerBase';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class AuthController extends ControllerBase {
  public async login({ auth, request, response }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    });

    const payload = await request.validate({ schema: loginSchema });
    const user = await User.query().where('email', payload.email).first();

    if (user === null) {
      return response
        .status(this.statusCodeHttpUnauthorized)
        .json({ error: 'Invalid credentials!' });
    }

    if (!(await Hash.verify(user.password, payload.password))) {
      return response
        .status(this.statusCodeHttpUnauthorized)
        .json({ error: 'Invalid credentials!' });
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '7days',
    });

    return {
      userId: token.user.id,
      ...token.toJSON(),
    };
  }

  public async register({ request }: HttpContextContract) {
    const registerSchema = schema.create({
      name: schema.string(),
      email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string([rules.minLength(6)]),
    });

    const payload = await request.validate({ schema: registerSchema });

    const username = payload.name.toLowerCase().trim();
    const usernameReplaced = username.replace(/[^a-zA-Z0-9]/g, '');
    const usernameFinal = usernameReplaced + Math.floor(Math.random() * 100000000000);

    payload['username'] = usernameFinal;

    const user = await User.create(payload);

    return user;
  }
}
