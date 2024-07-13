import jwt from 'jsonwebtoken'
import EnvVars from '../../constants/EnvVars.js'

export const createToken = payload => {
  const { Secret, Exp } = EnvVars.Jwt
  // console.log(payload)
  const token = jwt.sign(payload.toJSON(), Secret, { expiresIn: Exp })

  return token
}
