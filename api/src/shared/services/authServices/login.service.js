import User from '../../../db/models/auth.models.js'
import { verifyPassword } from '../../utils/passwordUtils.js'
import EnvVars from '../../../constants/EnvVars.js'
import { createToken } from '../../utils/createToken.js'
import HttpStatusCodes from '../../../constants/HttpStatusCodes.js'

export const loginService = async ({ username, password }) => {
  try {
    // find user in Database.
    const user = await User.findOne({ username })

    // console.log('User', user)

    // return if user not found
    if (!user) {
      return { data: 'User not found', status: HttpStatusCodes.BAD_REQUEST }
    }
    // checking password
    const VerifyPassword = verifyPassword(password, user.password) // 'user.password' is the hash
    // console.log('in login service after finding password')

    // returns if wrong password
    if (!VerifyPassword)
      return { data: 'Wrong password', status: HttpStatusCodes.UNAUTHORIZED }

    // Removing password for security.
    user.password = null

    // returns user credentials after verifying username and password.
    return { data: user, status: HttpStatusCodes.OK }
  } catch (error) {
    console.log('Error in login service ' + error)
  }
}