// import { useEffect, useState } from 'react'
import ChatList from './ChatList'
import LogoutButton from './LogoutButton'
import { useSelector } from 'react-redux'
// import useChatListFetch from '../../hooks/useChatListFetch'
import SearchInput from './SearchInput'
import { ChatContextProvider } from '../../context/ChatContext'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-slate-500 p-4 abc '>
      <ChatContextProvider>
        <SearchInput />
        <div className='divider px-3'></div>
        <ChatList />
      </ChatContextProvider>
      <LogoutButton />
    </div>
  )
}
export default Sidebar
