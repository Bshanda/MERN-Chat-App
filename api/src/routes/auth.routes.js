import express from 'express'
import authController from '../controllers/auth.controller.js'
import Paths from '../constants/Paths.js'

const router = express.Router()

router.post(Paths.Auth.Signup, authController.signUp)

router.post(Paths.Auth.Login, authController.login)

router.get(Paths.Auth.Logout, authController.logout)

export default router
