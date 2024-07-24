import Chat from '../../../db/models/chat.model.js'
import Message from '../../../db/models/messages.models.js'
import { getUserSocketId, io } from '../../../socket/socket.js'

export const saveToDb = async (recieverId, senderId, message) => {
  try {
    let chat = await Chat.findOne({
      participants: { $all: [senderId, recieverId] }
    })

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

    return { data: { chat, newMessage } }
  } catch (error) {
    console.log('Error in send msg service, saveToDb')
    return { error: error?.message || error }
  }
}

export const emitMsgToSockets = async (recieverId, senderId, newMessage) => {
  try {
    // getting socketId's from redis.
    const receiverSocketId = await getUserSocketId(recieverId)
    const senderSocketId = await getUserSocketId(senderId)

    if (!receiverSocketId || !senderSocketId) {
      console.log('No socket id')
      return { data: 'No sockets' }
    }

    // only emits if reciever is online and after the message is saved.

    //  io.to(<socket_id>).emit() //used to send events to specific client
    // donot emit if for some reason redis server lost its data.
    if (receiverSocketId?.length === 0) {
      return { data: 'reciever socket null' }
    }
    // emit to all instances of reciever.
    if (receiverSocketId?.length >= 1) {
      for (let i = 0; i < receiverSocketId.length; i++) {
        io.to(receiverSocketId[i]).emit('newMessage', newMessage)
      }
    }

    //  io.to(<socket_id>).emit() //used to send events to specific client

    // donot emit if for some reason redis server lost its data.
    if (senderSocketId?.length <= 1) {
      return { data: 'no other sender socket id' }
    }
    // if sender has multiple instances.Send to every one.
    if (senderSocketId?.length > 1) {
      for (let i = 0; i < senderId.length; i++) {
        io.to(senderSocketId[i]).emit('newMessage', newMessage)
      }
    }

    return { data: 'Message emitted' }
  } catch (error) {
    return { data: error }
  }
}

const messageServices = {
  saveToDb,
  emitMsgToSockets
}

export default messageServices
