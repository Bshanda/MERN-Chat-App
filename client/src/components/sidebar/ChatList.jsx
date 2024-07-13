import { useEffect, useState } from 'react'
import ListItem from './ListItem'
import useChatListFetch from '../../hooks/useChatListFetch'
import { useSelector } from 'react-redux'

const ChatList = () => {
  const { fetchChatList } = useChatListFetch() 
  const chatList = useSelector(state=>state.chatList.value)

  useEffect(() => {
    const controller = new AbortController()

    fetchChatList(controller.signal) 

    return () => {
      controller.abort('Unmounted')
    }
  }, [])

  useEffect(()=>{},[chatList])

  return (
    <div className={`max-w-full rounded `}>
      {chatList?.map((chat, i) => (
        <ListItem key={chat._id} user={chat} />
      ))}
    </div>
  )
}

export default ChatList
