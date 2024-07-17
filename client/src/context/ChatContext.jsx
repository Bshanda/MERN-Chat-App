import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux' 

export const ChatContext = createContext()

export const useChatContext = () => {
  return useContext(ChatContext)
}

export const ChatContextProvider = ({ children }) => {
  const chats = useSelector(state => state.chatList.value)
  const [filteredChats, setFilteredChats] = useState(chats)
  const selectedChat = useSelector(state => {
    state.selectedChat.value
  })
 

  const filterChats = search => {
    console.log('Chat context filter called')
    if (search == '') {
      setFilteredChats(chats)
      return
    }

    const filtered = chats.filter(chat =>
      chat.username?.toLowerCase().includes(search)
    )
    setFilteredChats(filtered)
  }

  // Update filteredChats when chats changes
  useEffect(() => {
    setFilteredChats(chats)
  }, [chats])

  // empty downloaded chats when selected chat is changed.
  useEffect(() => {  
  }, [selectedChat])

  return (
    <ChatContext.Provider value={{ filterChats, filteredChats }}>
      {children}
    </ChatContext.Provider>
  )
}
