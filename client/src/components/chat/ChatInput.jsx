import { useState } from 'react'

import { useSelector } from 'react-redux'
import useSendMessage from '../../hooks/useSendMessage'
import { useSocketContext } from '../../context/SocketContext'
import toast from 'react-hot-toast'

const ChatInput = () => {
  const [text, setText] = useState('')
  const { sendMessage } = useSendMessage()
  const { socket } = useSocketContext()
  const authUser = useSelector(state => state.authUser.value)
  const selectedChat = useSelector(state => state.selectedChat.value)

  const handleTextSubmit = e => {
    e.preventDefault()
    if (text == '') {
      toast.error('Please write something')
      return
    }

    sendMessage(text)
    socket.emit('newMessage', { text, senderId: authUser?._id, recieverId:selectedChat?._id })

    setText('')
  }

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       console.log(message)
  //     }, 500)

  //     // cleanup function
  //     return () => {
  //       clearTimeout(timer)
  //     }
  //   }, [])

  return (
    <div className='px-2 py-1 mb-2'>
      {/* <div className='max-w-full'> */}
      <form onSubmit={handleTextSubmit}>
        <input
          type='text'
          value={text}
          placeholder='send message'
          onChange={e => setText(e.target.value)}
          className=' min-w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        ></input>
        {/* <button onClick={handleSendMessage} className='px-3'>
          <img src={send} alt='send png' height='30' width={'30'}></img>
        </button> */}
      </form>
    </div>
    // </div>
  )
}

export default ChatInput
