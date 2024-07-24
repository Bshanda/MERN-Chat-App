// import { isValidObjectId } from 'mongoose'
import HttpStatusCodes from '../constants/HttpStatusCodes.js'
// import Chat from '../db/models/chat.model.js'
// import Message from '../db/models/messages.models.js'
// import { getUserSocketId, io } from '../socket/socket.js'
import { getChatService } from '../shared/services/messageServices/getChat.service.js'
import {
  saveToDb,
  emitMsgToSockets
} from '../shared/services/messageServices/sendChat.service.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { Id: recieverId } = req.params
    const senderId = req.user._id

    const saveRes = await saveToDb(recieverId, senderId, message)

    if (saveRes?.error) {
      throw new Error(saveRes?.error)
    }

    const chat = saveRes?.data?.chat

    const newMessage = saveRes?.data?.newMessage

    const emitRes = await emitMsgToSockets(recieverId, senderId, newMessage)

    // console.log(emitRes?.data)

    return res
      .status(HttpStatusCodes.OK)
      .json({ data: newMessage, socketRes: emitRes?.data })
      .end()
  } catch (error) {
    console.log(
      'Error: Internal server error in send message controller',
      error
    )
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error })
      .end()
  }
}

export const getChat = async (req, res) => {
  try {
    const { Id: receiverId, skip } = req.params
    const senderId = req.user._id
    const limit = 20

    // console.log('Reciever Id:-', receiverId)
    // console.log('Sender Id:-', senderId)

    const chats = await getChatService(receiverId, senderId, limit, skip)

    if (chats?.error) throw new Error(chats.error)
    if (chats?.data === null)
      return res.status(HttpStatusCodes.OK).json({ data: chats?.data }).end()

    return res.status(HttpStatusCodes.OK).json({ data: chats?.data }).end()

    // This doesnot work
    // let chats = await Chat.findOne({
    //   participants: { $all: [senderId, receiverId] },messages:{$limit:DEFAULT_LIMIT}
    // })
    //   .populate('messages')
    //   .skip(skip)
    //   .limit(10)

    // messages between two user. getting all messages ids from chat and then using
    // those id's to fetch messages.
    // Using options in populate to limit and skip for infinite scroll.

    // let chats = await Chat.findOne({
    //   participants: { $all: [senderId, receiverId] }
    // }).populate({
    //   path: 'messages',
    //   options: {
    //     sort: { createdAt: -1 }, // Sort messages by createdAt descending
    //     skip: skip, // Number of messages to skip
    //     limit: DEFAULT_LIMIT // Limit the number of messages fetched
    //   }
    // })

    // console.log('Chats between them:-', chats.messages)
    // let chats = await Chat.find({
    //   participants: { $all: [senderId, receiverId] }
    // }).populate('messages')

    console.log('Chats', chats)

    // returns empty array to the client if no chat is present
    if (chats?.length <= 0 || chats == null) {
      return res.status(HttpStatusCodes.OK).json({ data: null }).end()
    }

    // reversing, so that latest messages show at the bottom of the front end.
    chats.messages.reverse()

    return res.status(HttpStatusCodes.OK).json({ data: chats.messages }).end()
  } catch (error) {
    console.log('Error: Internal server error in get message controller', error)
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error })
      .end()
  }
}
