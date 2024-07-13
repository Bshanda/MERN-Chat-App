import HttpStatusCodes from '../constants/HttpStatusCodes.js'
import { singupService } from '../shared/services/authServices/signup.service.js'
import { loginService } from '../shared/services/authServices/login.service.js'
import { createToken } from '../shared/utils/createToken.js'
import EnvVars from '../constants/EnvVars.js'

const signUp = async (req, res) => {
  const newuser = req.body
  console.log(newuser)

  try {
    const { data, status } = await singupService(newuser)
    // console.log('signup controller called after saved user', savedNewUser)s

    // console.log(savedNewUser)
    // return error if user not created

    console.log('====================================')
    console.log(status)
    console.log('====================================')

    if (status !== true) {
      console.log('Error for not status')
      return res.status(HttpStatusCodes.CONFLICT).json({ error: data })
    }

    // Returns new user if created.
    console.log('====================================')
    console.log('New user created')
    console.log('====================================')
    return res.status(HttpStatusCodes.CREATED).json({ data, status })
  } catch (error) {
    console.log('====================================')
    console.log('Error in controller try catch')
    console.log('====================================')
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ Error })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  // console.log(req.body)

  try {
    // returns msg (msg will contain user object after verifying credentials) and status code.
    const { data, status, msg } = await loginService({ username, password })

    // Sends error on wrong password or non exsiting user.
    if (status !== HttpStatusCodes.OK) {
      // console.log(data)
      return res.status(status).json({ data, status }).end()
    }

    // console.log('User :-', user)

    // creates a token if user credentials are correct.
    const Token = createToken(data)

    res.cookie('jwt', Token, {
      maxAge: EnvVars.Jwt.Exp,
      httpOnly: true,
      secure: false
    })
    return res.status(HttpStatusCodes.OK).json({ data, status, Token })
  } catch (error) {
    console.log('Error in login controller', error)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error }).end()
  }
}

const logout = async (req, res) => {
  try {
    // delete the cookie.
    res.cookie('jwt', '', { maxAge: 0 })
    return res
      .status(HttpStatusCodes.OK)
      .json({ msg: 'Logged out successfully' })
      .end()
  } catch (error) {
    console.log('Error in logout controller : -', error)
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error })
      .end()
  }
}

const authController = {
  signUp,
  login,
  logout
}

export default authController
