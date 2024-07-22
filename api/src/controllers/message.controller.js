import { isValidObjectId } from 'mongoose'
import HttpStatusCodes from '../constants/HttpStatusCodes.js'
import Chat from '../db/models/chat.model.js'
import Message from '../db/models/messages.models.js'
import { getUserSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { Id: recieverId } = req.params
    const senderId = req.user._id

    if (senderId == recieverId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: 'Sender and reciever cannot be same' })
        .end()
    }

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

    // getting socketId's(if many) from redis.
    const receiverSocketId = await getUserSocketId(recieverId)
    const senderSocketId = await getUserSocketId(senderId)

    // only emits if reciever is online and after the message is saved.
    if (receiverSocketId) {
      //  io.to(<socket_id>).emit() //used to send events to specific client
      // donot iterate over RecieverSocketId's if for some reason redis server lost its data.
      if (receiverSocketId?.length === 0) {
        return res.status(HttpStatusCodes.OK).json({ data: newMessage }).end()
      }
      if (receiverSocketId?.length >= 1) {
        for (let i = 0; i < receiverSocketId.length; i++) {
          io.to(receiverSocketId[i]).emit('newMessage', newMessage)
        }
      }
    }

    // if sender has multiple instances.Send to every one
    if (senderSocketId) {
      //  io.to(<socket_id>).emit() //used to send events to specific client
      // donot iterate over RecieverSocketId's if for some reason redis server lost its data.
      if (senderSocketId?.length === 0) {
        return res.status(HttpStatusCodes.OK).json({ data: newMessage }).end()
      }
      if (senderSocketId?.length > 1) {
        for (let i = 0; i < receiverSocketId.length; i++) {
          io.to(senderSocketId[i]).emit('newMessage', newMessage)
        }
      }
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
    const { Id: receiverId, skip: skip } = req.params
    const senderId = req.user._id
    const DEFAULT_LIMIT = 20

    console.log('Reciever Id:-', receiverId)
    console.log('Sender Id:-', senderId)

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

    let chats = await Chat.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate({
      path: 'messages',
      options: {
        sort: { createdAt: -1 }, // Sort messages by createdAt descending
        skip: skip, // Number of messages to skip
        limit: DEFAULT_LIMIT // Limit the number of messages fetched
      }
    })

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
    console.log('Error: Internal server error in get message controller')
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error })
      .end()
  }
}
