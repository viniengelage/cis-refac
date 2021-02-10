'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.get('users', 'UserController.index').middleware(['auth', 'is:administrator'])
Route.get('users/:id', 'UserController.show')
Route.put('users/:id', 'UserController.update').middleware(['auth'])

Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.post('files', 'FileController.store')
Route.get('files/:id', 'FileController.show')

Route.resource('permissions', 'PermissionController').apiOnly().middleware(['auth', 'is:administrator'])

Route.resource('roles', 'RoleController').apiOnly().middleware('auth')
