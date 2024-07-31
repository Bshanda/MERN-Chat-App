import express from 'express'
// import usersController from '../controllers/auth.controller.js'
import Paths from '../constants/Paths.js'
import userController from '../controllers/users.controller.js'

const router = express.Router()

// Getting users, except the loggedIn user.
router.get(Paths.Users.Users, userController.getUsers)

// update user's own info
router.put(Paths.Users.selfUpdate, userController.selfUpdateUser) // edit current user info

// Send Friend Request
router.get(Paths.Users.SendFriendRequest, userController.sendFriendReuest)

// accept friend request.
router.get(Paths.Users.AcceptFriendRequest, userController.acceptFriendReuest)

// reject friend request.
router.get(Paths.Users.RejectFriendRequest, userController.rejectFriendReuest)

// get User's Friends.
router.get(Paths.Users.GetFriends, userController.getAllFriends)

// block a user.
router.get(Paths.Users.block, userController.blockUser)

export default router
