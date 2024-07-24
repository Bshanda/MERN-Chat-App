import express from 'express'
import Paths from '../constants/Paths.js'
import authRouter from './auth.routes.js'
import messageRouter from './message.routes.js'
import getUsersRouter from './users.routes.js'
import authentication from '../shared/middelware/authentication.js'

const apiRouter = express.Router()

apiRouter.use(Paths.Message.Base, authentication, messageRouter) // Message Router.

apiRouter.use(Paths.Auth.Base, authRouter) // Authentication Router.

apiRouter.use(Paths.Users.Base, authentication, getUsersRouter) // Get all user, except loggedIn user.
 
export default apiRouter
