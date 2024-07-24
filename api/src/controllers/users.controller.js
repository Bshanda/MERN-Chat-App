import HttpStatusCodes from '../constants/HttpStatusCodes.js'
import User from '../db/models/user.models.js'
import getUsersService from '../shared/services/userServices/getUsers.service.js'
import updateUser from '../shared/services/userServices/updateUser.service.js'

// getting users including the loggedIn user.
const getUsers = async (req, res) => {
  try {
    // getting the loggedIn user from user object, which was injected by protected route middelware
    const { _id: loggedInUser } = req.user

    // console.log(req.cookie)

    // using service for getting users.
    const users = await getUsersService(loggedInUser)

    if (users.error) {
      throw new Error('Error in finding users')
    }

    if (users.length < 1) {
      return res
        .status(HttpStatusCodes.OK)
        .json('No users apart from you')
        .end()
    }

    return res.status(HttpStatusCodes.OK).json(users).end()
  } catch (error) {
    console.log('Error in get Users contorller', error)
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error })
      .end()
  }
}

// Update self info. But cant change admin status if not an admin already.
const selfUpdateUser = async (req, res) => {
  try {
    const userId = req.user._id
    const updates = req.body

    console.log('Recieved user update request');

    if(updates?.admin)throw new Error("Only admin can give admin privilages")

    const { data, message, error } = await updateUser(userId, updates)

    if (error) throw new Error(error)

    return res.status(HttpStatusCodes.OK).json({ data, message }).end()
  } catch (error) {
    console.log('Error in updating user')
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
      .end()
  }
}

const userController = {
  getUsers,
  selfUpdateUser
  // makeAdmin
}

export default userController
