import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../../features/authUser/selectedChatSlice'
import { useSocketContext } from '../../../context/SocketContext'
import { clearMessages, setHasMore } from '../../../features/authUser/messagesSlice'
import { useEffect, useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'

const ListItem = ({ user }) => {
	const selectedChat = useSelector((state) => state.selectedChat.value)
	const isSelected = selectedChat?._id == user?._id
	const { onlineUsers } = useSocketContext()
	const isOnline = onlineUsers?.includes(user._id)
	const [userOpt, setUserOptVisible] = useState(false)

	const dispatch = useDispatch()

	const handleChatClick = () => {
		dispatch(setSelectedChat(user))
		dispatch(setHasMore(true))
	}

	const openOptions = () => {
		setUserOptVisible(!userOpt)
		console.log('Clicked on logs')
	}

	return (
		<>
			<div
				className={`flex gap-2 my-2 py-2 items-center ${!isSelected ? 'hover:bg-gray-600' : ''} p-2 py-1 cursor-pointer
				${isSelected ? 'bg-gray-800 text-white' : ''}
			`}>
				{/* // Profile pic */}
				<div className='' onClick={handleChatClick}>
					<div className={`flex justify-center items-center w-8 h-8 ${isSelected ? 'bg-white text-black' : 'bg-gray-700'} text-center m-auto text-lg font-bold rounded-full relative`}>
						{/* <img src={user.profilePic} alt='user avatar' /> */}
						<p className={`text-[15px] ${!isSelected ? 'text-white' : ''}`}>{user?.fullname[0].toUpperCase()}</p>
						{isOnline ? <span className='online'></span> : null}
					</div>
				</div>

				{/* // UserName and options*/}
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between '>
						<p className='text-[14px] font-semibold flex-grow capitalize' onClick={handleChatClick}>
							{user.username}
						</p>
						<div className={`text-sm  p-2 w-8 h-8 text-gray-500 relative ${isSelected ? 'text-white' : ''} hover:bg-black hover:text-white`}>
							<SlOptionsVertical onClick={openOptions} />
							{userOpt ? (
								<div className='absolute tooltip-bottom text-black bg-orange-500 z-10'>
									<ul>
										<li className='hover:bg-red'>1as</li>
										<li className='hover:bg-red'>1as</li>
										<li className='hover:bg-red'>1as</li>
										<li className='hover:bg-red'>1as</li>
									</ul>
								</div>
							) : (
								''
							)}
						</div>
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
