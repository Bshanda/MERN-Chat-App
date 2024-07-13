import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { extractTime } from '../../utils/extractTime'

const Message = ({ chat }) => {
  const authUser = useSelector(state => state.authUser.value)
  const selectedChat = useSelector(state => state.selectedChat.value)
  const bottomRef = useRef()
  const fromMe = chat.senderId === authUser._id
  const formattedTime = extractTime(chat.createdAt)
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilePic : selectedChat?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''

  const shakeClass = chat.shouldShake ? 'shake' : ''
  const [revealMsgTiming, setRevealMsgTiming] = useState(false)

  const revealMsgTime = () => {
    // console.log('Reveal msg called')
    setRevealMsgTiming(true)
  }

  const hideMsgTime = () => {
    // console.log('hide msg called')
    setRevealMsgTiming(false)
  }

  // Scroll to bottom or the last message
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }, 100)
  }, [])

  useEffect(() => {}, [revealMsgTiming])

  return (
    <div
      className={`message flex my-1 ${
        authUser?._id == chat?.senderId ? 'justify-end' : 'justify-start'
      } text-xs  `}
      ref={bottomRef}
      onMouseOver={revealMsgTime}
      onMouseLeave={hideMsgTime}
    >
      <div>
        <div
          className={`max-w-fit p-3 mx-2 ${
            authUser?._id == chat?.senderId
              ? 'bg-green-500 text-gray'
              : 'bg-sky-500'
          }  rounded-e-xl rounded-es-xl`}
        >
          {chat?.message}
        </div>
        {revealMsgTiming ? <div className=''>{formattedTime}</div> : <></>}
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
