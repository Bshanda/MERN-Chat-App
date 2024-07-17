import jwt from 'jsonwebtoken'
import EnvVars from '../../constants/EnvVars.js'
import HttpStatusCodes from '../../constants/HttpStatusCodes.js'
import User from '../../db/models/auth.models.js'

const isLoggedIn = async (req, res, next) => {
  // const token = req.headers.authorization
  let token = req.headers['authorization']

  token = token?.split(' ')[1] || false

  // console.log('IS logged in :-', token)
  try {
    // Returns if cookie token not found
    if (!token) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unauthorized -  No Token Provided ' })
        .end()
    }

    // verfies the token
    const decoded = jwt.verify(token, EnvVars.Jwt.Secret)

    // returns if token expired.
    if (!decoded) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unauthorized -  Token Expired or Invalid Token ' })
        .end()
    }

    const user = await User.findById(decoded._id).select('-password')
    // returns if user not found
    if (!user) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ error: 'User Not Found' })
        .end()
    }

    req.user = user

    next()
  } catch (error) {
    console.log('Error in auth middelware',error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error })
      .end()
  }
}

export default isLoggedIn
