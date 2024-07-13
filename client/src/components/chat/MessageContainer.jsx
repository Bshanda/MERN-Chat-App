import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TiMessages } from 'react-icons/ti'

import Header from './Header'
import Messages from './Messages'
import ChatInput from './ChatInput'

const MessageContainer = () => {
  const selectedChat = useSelector(state => state.selectedChat.value)
  const messages = useSelector(state => state.messages.value)

  // re-render when a chat or conversation is selected.
  useEffect(() => {}, [selectedChat])

  //

  return (
    <div
      className={`  abc flex flex-col ${
        messages ? 'justify-between' : 'justify-around'
      }  p-4`}
    >
      {!selectedChat ? (
        <>
          {/* <div className='text-black m-auto text-center text-wrap p-5'>
            Select a conversation for starting a chat
          </div> */}
          <NoChatSelected />
        </>
      ) : (
        <>

          <Header selectedChat={selectedChat}></Header>
          <div className='overflow-auto'>
            <Messages></Messages>
          </div>
          <ChatInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  const authUser = useSelector(state => state.authUser.value)
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.username} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}
