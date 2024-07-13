import { createContext, useContext, useEffect, useState } from 'react'
import useLogin from '../hooks/useLogin'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const authUser = useSelector(state => state.authUser.value)

  useEffect(() => {
     
    if (authUser?._id) {
      console.log('Socket connected');
      const socket = io('http://localhost:4080', {
        query: {
          userId: authUser?._id
        }
      })

      setSocket(socket)

      socket.on('getOnlineUsers', users => {
        setOnlineUsers(users)
      })

      return () => {
        socket.close()
      }
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [authUser])

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
