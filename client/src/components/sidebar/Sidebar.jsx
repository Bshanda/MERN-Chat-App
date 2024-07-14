import ChatList from './ChatList'
import LogoutButton from './LogoutButton'
import SearchContainer from './SearchContainer'
import SearchInput from './SearchInput'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-slate-500 p-4 abc '>
        <SearchContainer />
        <div className='divider px-3'></div>
        <ChatList />
        <LogoutButton />
    </div>
  )
}
export default Sidebar
