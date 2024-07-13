import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux'
import { addNewMessage, setMessages } from '../features/authUser/messagesSlice'

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const messages = useSelector(state => state.messages.value)
  const dispatch = useDispatch()

  useEffect(() => {
    // socket.on() is used to listen to the events. can be used both on client and server side
    socket?.on('newMessage', message => {
      dispatch(addNewMessage(message))
    })

    return () => {
      socket?.off('newMessage')
    }
  }, [socket, messages])
}

export default useListenMessages
