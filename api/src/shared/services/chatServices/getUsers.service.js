import HttpStatusCodes from '../../../constants/HttpStatusCodes.js'
import User from '../../../db/models/auth.models.js'

//
const getUsersService = async loggedInUser => {
  try {
    // getting users except the loggedIn user.
    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      '-password'
    )

    return users
  } catch (error) {
    console.log('Error in get Users service', error)
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error })
      .end()
  }
}

export default getUsersService
