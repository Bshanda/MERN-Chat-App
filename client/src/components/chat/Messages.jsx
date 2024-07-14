import { useSelector } from 'react-redux'
import Message from './Message'
import { useEffect, useRef } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'
import MessageSkeleton from '../skeleton/MessagesSkeleton'

const Messages = () => {
  const selectedChat = useSelector(state => state.selectedChat.value)
  const messages = useSelector(state => state.messages?.value)
  const { getMessages, loading } = useGetMessages()
  // hook for SocketIo live message emitting and recieving
  useListenMessages()

  useEffect(() => {
    const controller = new AbortController()

    // console.log('Messages fetch req');
    getMessages(controller.signal)

    // cleanUp function.
    return () => {
      controller.abort('Messages Unmounted')
    }
  }, [selectedChat])

  //   re-render when chats update
  useEffect(() => {}, [messages])

  return (
    <div className='mt-3'>
      <>
        {/* Show skeleton if loading */}
        {loading && <MessageSkeleton />}

        {/* Show messages if prior conversAtion present */}

        {!loading &&
          messages.length > 0 &&
          messages?.map((message) => (
            <div key={message._id}>
              <Message chat={message}></Message>
            </div>
          ))}

        {/* If no prior conversation */}
        {!loading && messages.length === 0 && (
          <p className='text-center'>Send a message</p>
        )}
      </>
    </div>
  )
}

export default Messages
