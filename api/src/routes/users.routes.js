import express from 'express'
import usersController from '../controllers/auth.controller.js'
import Paths from '../constants/Paths.js'
import getUsers from '../controllers/users.controller.js'
import isLoggedIn from '../shared/middelware/isLoggedIn.js'

const router = express.Router()

// Getting users, except the loggedIn user.
router.get(Paths.Users.Users, getUsers)

export default router
