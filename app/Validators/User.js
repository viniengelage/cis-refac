'use strict'

const Antl = use('Antl')

class user {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      CPF: 'required|unique:users',
      RG: 'required|unique:users',
      crm: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = user
