'use strict'

const Mail = use('Mail')

class NewUserMail {
  static get concurrency () {
    return 3
  }

  static get key () {
    return 'NewUserMail-job'
  }

  async handle ({ email, full_name }) {
    console.log(`Job: ${NewUserMail.key}`)
    await Mail.send(
      ['emails.new_user'],
      { full_name },
      message => {
        message
          .from('cis@uniamerica.br')
          .to(email)
          .subject('Bem vindo!')
      }
    )
  }
}

module.exports = NewUserMail
