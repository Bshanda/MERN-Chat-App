import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../../features/authUser/selectedChatSlice'
import { useSocketContext } from '../../../context/SocketContext'
import {
  clearMessages,
  setHasMore
} from '../../../features/authUser/messagesSlice'
import { useEffect, useState } from 'react'

const ListItem = ({ user }) => {
  const selectedChat = useSelector(state => state.selectedChat.value)
  const isSelected = selectedChat?._id == user?._id
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers?.includes(user._id)
  const [clicked, setclicked] = useState(false)

  const dispatch = useDispatch()

  const handleChatClick = () => {
    dispatch(setSelectedChat(user))
    dispatch(setHasMore(true))
    setclicked(true)
  }

  return (
    <>
      <div
        className={`flex gap-2 my-2 items-center ${
          !isSelected ? 'hover:bg-gray-600' : ''
        } p-2 py-1 cursor-pointer
				${isSelected ? 'bg-gray-800 text-white' : ''}
			`}
        onClick={handleChatClick}
      >
        {/* // Profile pic */}
        <div className=''>
          <div
            className={`flex justify-center items-center w-12 h-12 ${
              isSelected ? 'bg-white text-black' : 'bg-gray-700'
            } text-center m-auto text-lg font-bold rounded-full relative`}
          >
            {/* <img src={user.profilePic} alt='user avatar' /> */}
            <p>{user?.fullname[0]}</p>
            {isOnline ? <span className='online'></span> : null}
          </div>
        </div>

        {/* // UserName */}
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold'>{user.username}</p>
            {/* <span className='text-xl'>{emoji}</span> */}
          </div>
        </div>
      </div>
      {/* 
{
  !lastIdx && <div className='divider my-0 py-0 h-1' />
} */}
    </>
  )
}

export default ListItem
