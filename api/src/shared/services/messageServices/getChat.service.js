import Chat from '../../../db/models/chat.model.js'

export const getChatService = async (recieverId, senderId, limit, skip) => {
  try {
    let chats = await Chat.findOne({
      participants: {
        $all: [senderId, recieverId]
      }
    }).populate({
      path: 'messages',
      options: {
        sort: { createdAt: -1 }, // Sort messages by createdAt descending
        skip: skip, // Number of messages to skip
        limit: limit // Limit the number of messages fetched
      }
    })

    // console.log('Chats', chats)

    // returns empty array to the client if no chat is present
    if (chats?.length <= 0 || chats == null) {
      return { data: null }
    }

    // reversing, so that latest messages show at the bottom of the front end.
    chats.messages.reverse()

    return { data: chats.messages }
  } catch (error) {
    return { error: 'Error in getting chats, chatService' }
  }
}
