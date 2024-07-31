import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/chat/MessageContainer'
import { SocketContextProvider } from '../context/SocketContext'
import SideNavbar from '../components/sideNavbar/SideNavbar'

const Home = () => {
	return (
		<div>
			<div className='flex h-screen text-sm'>
				<SocketContextProvider>
					<SideNavbar />
					<Sidebar />
					<MessageContainer />
				</SocketContextProvider>
			</div>
		</div>
	)
}

export default Home
