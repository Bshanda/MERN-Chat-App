// import { useEffect, useState } from 'react'
import ChatList from './chats/ChatList' 
import { ChatContextProvider } from '../../context/ChatContext'
import CurrentUser from './user/CurrentUser'
import SearchInput from './search/SearchInput'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-slate-500 p-4 abc '>
      <ChatContextProvider>
        <SearchInput />
        <div className='divider px-3'></div>
        <ChatList />
      </ChatContextProvider>
      <CurrentUser />
      {/* <LogoutButton /> */}
    </div>
  )
}
export default Sidebar
