import { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import useLogin from '../hooks/useLogin'
import { useSelector } from 'react-redux'
import MessageContainer from '../components/chat/MessageContainer'
import { SocketContextProvider } from '../context/SocketContext'

const Home = () => {
  return (
    <div>
      <div className='flex justify-center h-screen'>
        <SocketContextProvider>
          <Sidebar />
          <MessageContainer />
        </SocketContextProvider>
      </div>
    </div>
  )
}

export default Home
