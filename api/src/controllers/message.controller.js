import HttpStatusCodes from '../constants/HttpStatusCodes.js'
import Chat from '../db/models/chat.model.js'
import Message from '../db/models/messages.models.js'
import { getRecieverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { Id: recieverId } = req.params
    const senderId = req.user._id

    let chat = await Chat.findOne({
      participants: { $all: [senderId, recieverId] }
    })
    // console.log('Send Message called')

    // For new chat between sender and reciever.If, first chat
    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, recieverId]
      })
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message
    })

    if (newMessage) {
      chat.messages.push(newMessage._id)
    }
    // this will not run in parellal
    // await newMessage.save()
    // await chat.save()

    // chat and message will save in parellal
    await Promise.all([chat.save(), newMessage.save()])

    // socket io functionality for live chatting.

    const receiverSocketId = getRecieverSocketId(recieverId)

    // only emits if reciever is online and after the message is saved.
    if (receiverSocketId) {
      //  io.to(<socket_id>).emit() //used to send events to specific client
      // emits only if msg in not nothing
      if (newMessage != '')
        io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    return res.status(HttpStatusCodes.OK).json({ data: newMessage }).end()
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
    const { Id: receiverId } = req.params
    const senderId = req.user._id

    console.log('Reciever Id:-', receiverId)

    // messages between two user. getting all messages ids from chat and then using those id's to fetch messages.
    let chats = await Chat.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate('messages')

    console.log('Sender id:-', senderId)

    // returns empty array to the client if no chat is present
    if (!chats) {
      return res.status(HttpStatusCodes.OK).json({ data: [] }).end()
    }

    // console.log('Chats between them:-', chats.messages)
    return res.status(HttpStatusCodes.OK).json({ data: chats.messages }).end()
  } catch (error) {
    console.log('Error: Internal server error in get message controller')
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error })
      .end()
  }
}
