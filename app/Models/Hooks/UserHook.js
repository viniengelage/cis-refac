'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewUserMail')

const UserHook = exports = module.exports = {}

UserHook.sendNewUserEmail = async userInstance => {
  const { full_name, email } = await userInstance

  Kue.dispatch(Job.key, { email, full_name }, {
    attempts: 3
  })
}
