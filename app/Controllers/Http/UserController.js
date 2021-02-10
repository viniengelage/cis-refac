'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
  async store ({ request }) {
    const { permissions, roles, ...data } = request.only(
      ['CPF', 'RG', 'full_name', 'email', 'password', 'crm', 'avatar_id', 'roles', 'permissions'])

    const trx = await Database.beginTransaction()

    const user = await User.create({ ...data, status: 'pendent' }, trx)

    if (roles) {
      await user.roles().attach(roles)
    }

    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    await trx.commit()

    return user
  }

  async update ({ request, response, auth, params }) {
    const { permissions, roles, ...data } = request.only(
      ['CPF', 'RG', 'full_name', 'email', 'password', 'crm', 'avatar_id', 'roles', 'permissions'])

    const user = await User.findOrFail(params.id)

    const trx = await Database.beginTransaction()

    if (auth.user.id !== user.id) {
      return response
        .status(401)
        .send({ error: { message: 'Você não pode alterar dados de outra pessoa' } })
    }

    await user.merge(data, trx)

    await user.save()

    if (roles) {
      await user.roles().sync(roles)
    }

    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    await trx.commit()

    return user
  }

  async index ({ request, response }) {
    const { page } = request.get()

    const users = await User.query().paginate(page)

    return response.status(200).send(users)
  }

  async show ({ response, params }) {
    const user = await User.findOrFail(params.id)

    return response.status(200).send(user)
  }
}

module.exports = UserController
