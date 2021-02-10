'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('CPF', 45).notNullable().unique()
      table.string('RG', 45).notNullable().unique()
      table.string('full_name', 60).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('crm', 45).unique()
      table.string('status')
      table.string('token')
      table.timestamp('token_created_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
