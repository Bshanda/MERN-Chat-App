import HttpStatusCodes from '../constants/HttpStatusCodes.js'
import getUsersService from '../shared/services/chatServices/getUsers.service.js'

const getUsers = async (req, res) => {
  try {
    // getting the loggedIn user from user object, which was injected by protected route middelware
    const { _id: loggedInUser } = req.user

    // console.log(req.cookie)

    // getting users except the loggedIn user.
    const users = await getUsersService(loggedInUser)

    return res.status(HttpStatusCodes.OK).json(users).end()
  } catch (error) {
    console.log('Error in get Users contorller', error)
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error })
      .end()
  }
}

export default getUsers
