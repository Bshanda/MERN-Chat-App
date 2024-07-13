import { useState } from 'react'
import Paths from '../constants/Paths'
import { useDispatch, useSelector } from 'react-redux'
import { addNewMessage, setMessages } from '../features/authUser/messagesSlice'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const recieverId = useSelector(state => state.selectedChat?.value?._id)

  const sendMessage = async message => {
    if (!recieverId) {
      console.log('User not selected')
      return
    }
    setLoading(true)
    const chatApi = Paths.Message.Send
    const sendMessageApi = chatApi + recieverId

    console.log('Reciever Id:-', sendMessageApi)

    try {
      const r = await fetch(sendMessageApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        },
        body: JSON.stringify({ message })
      })

      const res = await r?.json()

      if (res?.error) {
        throw new Error(res.error)
        console.log('Error in useSendMessage:-', res.error)
      }

      console.log('Server response for send message', res.data)
      // add new message to existing messages.
      dispatch(addNewMessage(res.data))
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage
