import ChatList from './ChatList'
import LogoutButton from './LogoutButton'
import SearchContainer from './SearchContainer'
import SearchInput from './SearchInput'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex justify-around'>
      <div className='m-2 relative'>
        <SearchContainer/>
        <div className='divider px-3'></div>
        <ChatList />
        <LogoutButton />
      </div>
    </div>
  )
}
export default Sidebar
