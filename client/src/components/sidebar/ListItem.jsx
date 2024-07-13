import Avatar from './Avatar'
import UserName from './UserName'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeSelectedChat,
  setSelectedChat
} from '../../features/authUser/selectedChatSlice'
import { useEffect, useState } from 'react'
import { useSocketContext } from '../../context/SocketContext'

const ListItem = ({ user }) => {
  const selectedChat = useSelector(state => state.selectedChat.value)
  const isSelected = selectedChat?._id == user?._id
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers?.includes(user._id)

  const dispatch = useDispatch()

  const handleChatClick = async () => {
    dispatch(setSelectedChat(user))
  }

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? 'bg-sky-500' : ''}
			`}
        onClick={handleChatClick}
      >
        {/* // Profile pic */}
        <div>
          <div className={`w-12 rounded-full relative`}>
            <img src={user.profilePic} alt='user avatar' />
            {isOnline ? <span className='online'></span> : null}
          </div>
        </div>

        {/* // UserName */}
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-700'>{user.username}</p>
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
