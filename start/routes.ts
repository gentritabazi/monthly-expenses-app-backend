/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.post('/auth/login', '/App/Controllers/AuthController.login');
Route.post('/auth/register', '/App/Controllers/AuthController.register');

Route.get('/users/me', '/App/Controllers/UserController.getMe').middleware('auth');
Route.get('/users/top-6', '/App/Controllers/UserController.getTop6');
Route.put('/users/me', '/App/Controllers/UserController.updateMe').middleware('auth');
Route.put('/users/me/picture', '/App/Controllers/UserController.updateMePicture').middleware(
  'auth'
);
Route.get('/users/:username', '/App/Controllers/UserController.getByUserName');

Route.get('/expenses', '/App/Controllers/ExpenseController.index').middleware('auth');
