import ChatList from './chats/ChatList'
import { ChatContextProvider } from '../../context/ChatContext'
import SearchInput from './search/SearchInput'
import { useSelector } from 'react-redux'

const Sidebar = () => {
	const selectedChat = useSelector((state) => state.selectedChat?.value)
	return (
		<div className={`flex flex-col grow border-r border-slate-500 p-4 abc ${selectedChat ? 'sm:flex' : 'flex'}`}>
			<ChatContextProvider>
				<SearchInput />
				<div className='p-5 pl-2 font-bold'>Message</div>
				<ChatList />
			</ChatContextProvider>
		</div>
	)
}
export default Sidebar
