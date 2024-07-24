import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import { useEffect, useRef, useState } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'
import MessageSkeleton from '../skeleton/MessagesSkeleton'
import { setScrollToBottom } from '../../features/authUser/messagesSlice'

const Messages = () => {
  // for infinite scroll
  const [skip, setSkip] = useState(0)
  const scrollToBottom = useSelector(state => state.messages?.scrollToBottom)
  const [showNoMoreMessage, setShowMoreMessages] = useState(true)
  const [divider, setDivider] = useState(false)

  // fecthing selected user and messages from redux
  const selectedChat = useSelector(state => state.selectedChat?.value)
  let messages = useSelector(state => state.messages?.value)
  const hasMore = useSelector(state => state.messages?.hasMore)

  // for fetching messages from server.
  const { getMessages, loading } = useGetMessages()

  // hook for SocketIo live message emitting and recieving
  useListenMessages()

  // redux state change
  const dispatch = useDispatch()

  // Will fetch messages when user selects another chat or reched the end of fetched messages
  useEffect(() => {
    setShowMoreMessages(false)
    setScrollToBottom(true)
    const controller = new AbortController()

    // console.log('Messages fetch req');
    getMessages({ signal: controller.signal, skip })

    // cleanUp function.
    return () => {
      controller.abort('Messages Unmounted')
    }
  }, [skip, selectedChat, divider])

  //   re-render when chats update
  useEffect(() => {
    if (messages?.length > 0) {
    }
    // dispatch(setScrollToBottom(false))
  }, [messages])

  // Function for infinte scroll.
  const handleScroll = e => {
    const { scrollTop, clientTop } = e.target
    const numberOfFetchedMessages = messages?.length

    // shows "no more messages" alert only if scrolled.
    setShowMoreMessages(true)

    // Will make a fetch call when we scroll to last loaded message.
    if (scrollTop === 0) {
      setDivider(true)
      if (scrollToBottom == true) {
        // setScrollToBottom(false)
        // dispatch(setScrollToBottom(false))
      }

      console.log('Last message')
      if (!hasMore) {
        console.log('No more massgese')
        return
      }
      setSkip(numberOfFetchedMessages)
      console.log(skip)
      return
    }

    if (scrollTop > 10) {
      if (scrollToBottom !== true) dispatch(setScrollToBottom(true))
    }
  }

  return (
    <div className='overflow-auto mt-auto' onScroll={handleScroll}>
      <div className='mt-3'>
        {/* Show skeleton if loading */}
        {loading == true && <MessageSkeleton />}

        {loading == false && hasMore == false && showNoMoreMessage == true && (
          <p className='text-center my-4'>No more messages</p>
        )}

        {/* Show messages if prior conversAtion present */}

        {!loading &&
          messages?.length > 0 &&
          messages?.map(message => (
            <div key={message?._id}>
              <Message chat={message} scrollToBottom={scrollToBottom}></Message>
            </div>
          ))}

        {/* If no prior conversation */}
        {loading === false && messages?.length === 0 && (
          <p className='text-center'>Send a message</p>
        )}
      </div>
    </div>
  )
}

export default Messages
