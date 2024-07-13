import { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import useLogin from '../hooks/useLogin'
import { useSelector } from 'react-redux'
import MessageContainer from '../components/chat/MessageContainer'

const Home = () => { 

  return (
    <div>
      <div className='flex justify-center h-screen'>
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home
