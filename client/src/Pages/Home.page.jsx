import { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import useLogin from '../hooks/useLogin'
import { useSelector } from 'react-redux'
import MessageContainer from '../components/chat/MessageContainer'
import { SocketContextProvider } from '../context/SocketContext'
import SideNavbar from '../components/sideNavbar/SideNavbar'

const Home = () => {
  return (
    <div>
      <div className='flex h-screen flex-auto'>
        <SocketContextProvider>
          <SideNavbar />
          <Sidebar />
          <MessageContainer />
        </SocketContextProvider>
      </div>
    </div>
  )
}

export default Home
