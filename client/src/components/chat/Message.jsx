import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { extractTime } from '../../utils/extractTime'
import Avatar from '../sidebar/Avatar.jsx'

const Message = ({ chat, scrollToBottom }) => {
  const authUser = useSelector(state => state.authUser?.value)
  // const selectedChat = useSelector(state => state.selectedChat?.value)
  const bottomRef = useRef()
  const fromMe = chat?.senderId === authUser?._id
  // const formattedTime = extractTime(chat?.createdAt)
  // const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  // const profilePic = fromMe ? authUser?.profilePic : selectedChat?.profilePic
  // const bubbleBgColor = fromMe ? 'bg-blue-500' : ''

  // Scroll to bottom or the last message if first render
  useEffect(() => {
    if (scrollToBottom == true) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })
      }, 100)
    }
  }, [])

  return (
    <div className='mb-2' ref={bottomRef}>
      <div className={`chat chat-${fromMe ? 'end' : 'start'} text-sm`}>
        <div
          className={`chat-bubble ${
            fromMe
              ? 'bg-black stroke-transparent'
              : 'bg-black stroke-transparent'
          }`}
        >
          {chat?.message}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className={`chat ${chatClassName}`}>
  //     <div className='chat-image avatar'>
  //       <div className='w-10 rounded-full'>
  //         <img alt='Tailwind CSS chat bubble component' src={profilePic} />
  //       </div>
  //     </div>
  //     <div
  //       className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
  //     >
  //       {chat.message}
  //     </div>
  //     <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
  //       {formattedTime}
  //     </div>
  //   </div>
  // )
}

export default Message
