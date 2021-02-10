'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('afterCreate', 'UserHook.sendNewUserEmail')
  }

  static get hidden () {
    return ['password', 'token', 'token_created_at']
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  avatar () {
    return this.hasOne('App/Models/File')
  }

  insurance () {
    return this.hasOne('App/Models/Insurance')
  }
}

module.exports = User
