import express from 'express'
// import usersController from '../controllers/auth.controller.js'
import Paths from '../constants/Paths.js'
import userController from '../controllers/users.controller.js'

const router = express.Router()

// Getting users, except the loggedIn user.
router.get(Paths.Users.Users, userController.getUsers)

router.put(Paths.Users.selfUpdate, userController.selfUpdateUser) // edit current user info

export default router
