'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserInsuranceFileRelationSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.integer('avatar_id').unsigned().references('id').inTable('files').onUpdate('CASCADE').onDelete('SET NULL')
      table.integer('insurance_id').unsigned().references('id').inTable('insurances').onUpdate('CASCADE').onDelete('SET NULL')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('avatar_id')
      table.dropColumn('insurance_id')
    })
  }
}

module.exports = UserInsuranceFileRelationSchema
