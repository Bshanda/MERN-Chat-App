import { useState } from 'react'
import { IoIosSend } from 'react-icons/io'

import { useDispatch, useSelector } from 'react-redux'
import useSendMessage from '../../hooks/useSendMessage'
import { useSocketContext } from '../../context/SocketContext'
import toast from 'react-hot-toast'
import { setScrollToBottom } from '../../features/authUser/messagesSlice'

const ChatInput = () => {
  const [text, setText] = useState('')
  const { sendMessage, loading } = useSendMessage()
  const { socket } = useSocketContext()
  const authUser = useSelector(state => state.authUser.value)
  const selectedChat = useSelector(state => state.selectedChat.value)

  // scroll to bottom of sender's chat if a new message is sent.
  const dispatch = useDispatch()

  const handleTextSubmit = () => {
    if (text == '') {
      toast.error('Please write something')
      return
    }
    dispatch(setScrollToBottom(true))

    sendMessage(text)
    setText('')
  }

  return (
    <div
      className='px-2 py-1 mb-2 relative
'
    >
      {/* <div className='max-w-full'> */}

      <input
        type='text'
        value={text}
        placeholder='send message'
        onChange={e => setText(e.target.value)}
        className=' min-w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      ></input>
      <button className='px-3 absolute right-2 top-6'>
        {/* <img src={send} alt='send png' height='30' width={'30'}></img> */}
        {!loading ? (
          <IoIosSend onClick={handleTextSubmit} />
        ) : (
          <div className='loading loading-spinner'></div>
        )}
      </button>
    </div>
    // </div>
  )
}

export default ChatInput
