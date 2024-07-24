import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const authUser = useSelector(state => state.authUser.value)
  const navigate = useNavigate()
  const token = useSelector(state => state.authUser.token)

  useEffect(() => {
    if (authUser?._id) {
      console.log('Socket connected')
      const socket = io('http://localhost:4080', {
        query: {
          userId: authUser?._id
        } 
      })

      // On connection error.
      // socket.on('connect_error', err => {
      //   console.log(err instanceof Error) // true
      //   console.log(err.message) // not authorized
      //   console.log(err.data) // { content: "Please retry later" }
      //   return
      // })

      setSocket(socket)

      // socket.on(<event>:string, callback:any) can be used on both server and client.
      socket.on('getOnlineUsers', async users => {
        console.log('online users:-', users)
        const OnlineUsers = await users
        setOnlineUsers(OnlineUsers)
      })

      return () => {
        socket.close()
      }
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
        return
      }
    }
  }, [authUser])

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
