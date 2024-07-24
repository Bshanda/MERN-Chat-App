import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux'

import { addOneMessage, setMessages } from '../features/authUser/messagesSlice'
import toast from 'react-hot-toast'

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const messages = useSelector(state => state.messages.value)
  const dispatch = useDispatch()
  const selectedChat = useSelector(state => state.selectedChat.value)

  useEffect(() => {
    // socket.on() is used to listen to the events. can be used both on client and server side
    console.log('Listning to newMessage events');
    socket?.on('newMessage', (message) => {
       dispatch(addOneMessage(message))
    })

    return () => {
      socket?.off('newMessage')
    }
  }, [socket, messages])
}

export default useListenMessages
