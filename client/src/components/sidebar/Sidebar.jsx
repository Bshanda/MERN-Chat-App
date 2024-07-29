// import { useEffect, useState } from 'react'
import ChatList from './chats/ChatList'
import { ChatContextProvider } from '../../context/ChatContext'
import CurrentUser from './user/CurrentUser'
import SearchInput from './search/SearchInput'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col grow border-r border-slate-500 p-4 abc '>
      <ChatContextProvider>
        <SearchInput />
        <div className='p-5 pl-2 font-bold'>Message</div>
        <ChatList />
      </ChatContextProvider>
    </div>
  )
}
export default Sidebar
