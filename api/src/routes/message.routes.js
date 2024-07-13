import express from 'express'
import Paths from '../constants/Paths.js'
import { getChat, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.get(`${Paths.Message.GetChat}`, getChat) // get chat between current user and selected user

router.post(`${Paths.Message.Send}`, sendMessage) // send message

export default router
