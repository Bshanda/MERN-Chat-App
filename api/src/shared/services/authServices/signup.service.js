import User from '../../../db/models/auth.models.js'
import { generateHash, verifyPassword } from '../../utils/passwordUtils.js'
import EnvVars from '../../../constants/EnvVars.js'
import { createToken } from '../../utils/createToken.js'
import HttpStatusCodes from '../../../constants/HttpStatusCodes.js'

export const singupService = async newuser => {
  let { fullname, username, password, gender } = newuser

  try {
    // checking if username available
    let user = await User.findOne({ username })
    if (user) {
      console.log('User already exists', user)
      return {
        data: 'User already exists',
        status: false
      }
    }

    // Hashing password for security
    const hash = generateHash(password)

    // console.log('signu pservice called after user findone')
    // Setting profile pic for boy and girl.
    //https://avatar-placeholder.iran.liara.run/

    const MaleProile = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const FemaleProile = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newuser = new User({
      username,
      fullname,
      password: hash,
      gender,
      profilePic: gender == 'male' ? MaleProile : FemaleProile
    })

    const saveduser = await newuser.save()

    console.log('saveduser', saveduser)
    saveduser.password = null

    return { data: saveduser, status: true }
  } catch (error) {
    console.log({ Msg: `${error}` })
    return { data: error, status: false }
  }
}
