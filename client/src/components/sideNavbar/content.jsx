import { getFromLocalStorage } from '../../utils/localStorage'
import LogoutButton from '../sidebar/LogoutButton'

const navBarIconSize = '25px'

const user = getFromLocalStorage('chat-user')

export const sideNavBarContent = {
	top: [
		{
			title: 'Chats',
			link: '/chats',
			icon: <i class='fa fa-comment fa-lg'></i>
		},
		{
			title: 'Groups',
			icon: <i className='fa fa-group'></i>
		}
	],
	bottom: [
		{
			title: 'Settings',
			icon: <i className='fa fa-gear'></i>,
			onclick: () => document.getElementById('my_modal_3').showModal()
		},
		{
			title: `Logout ${user?.username}`,
			icon: <i className='fa fa-power-off fa-2x'></i>,
			onclick: () => {},
			component: <LogoutButton />
		}
	]
}
