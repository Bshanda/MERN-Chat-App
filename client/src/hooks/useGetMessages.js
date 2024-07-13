import { useEffect, useState } from 'react'
import Paths from '../constants/Paths'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../features/authUser/messagesSlice'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const selectedChat = useSelector(state => state.selectedChat.value)
  const dispatch = useDispatch()

  const getMessages = async signal => {
    // return if no conversation is selected.
    setLoading(true)
    if (!selectedChat) {
      console.log('Chat not selected')
      return
    }

    // console.log('Fetch from:-', selectedChat)

    // api endpoints for fetching a chat.
    const chatApi = Paths.Message.GetChat
    const messageApi = chatApi + selectedChat?._id

    // console.log('Fetch chat called', messageApi)

    // fetch conversation.
    try {
      // requesting conversation.
      const r = await fetch(messageApi, {
        method: 'GET',
        headers: {
          'Content-Type': 'applicat ion/json',
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        },
        signal
      })

      // converting readable stream to a json object.
      const decodedMessages = await r.json()

      // return in no prior conversation.
      if (decodedMessages?.length == 0) {
        dispatch(setMessages(null))
        return
      }

      console.log('Fetched chats :-', decodedMessages.data)
      // save to message slice in redux.
      dispatch(setMessages(decodedMessages.data))
      return
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return { getMessages, loading }
}

export default useGetMessages
