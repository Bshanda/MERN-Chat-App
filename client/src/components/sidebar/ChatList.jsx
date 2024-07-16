import { useEffect, useState } from 'react'
import ListItem from './ListItem'
import useChatListFetch from '../../hooks/useChatListFetch'
// import useChatSearch from '../../hooks/useChatListSearch'
import { useSelector } from 'react-redux'
import { useChatContext } from '../../context/ChatContext'

const ChatList = () => {
  // const chatList = useSelector(state => state.chatList.filteredChats)

  const { fetchChatList } = useChatListFetch()

  const { filteredChats } = useChatContext()

  useEffect(() => {}, [filteredChats])

  useEffect(() => {
    const controller = new AbortController()
    fetchChatList(controller.signal)
    return () => {
      controller.abort('Unmounted')
    }
  }, [])

  return (
    <div className={`max-w-screen-sm rounded-lg bg-base-200 overflow-auto`}>
      {filteredChats?.map(chat => (
        <ListItem key={chat?._id} user={chat} />
      ))}
    </div>
  )
}

export default ChatList
