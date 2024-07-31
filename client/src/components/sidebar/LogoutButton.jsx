import { BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { removeToken, removeUser } from '../../features/authUser/authUserSlice'

import { useNavigate } from 'react-router-dom'
import { clearMessages } from '../../features/authUser/messagesSlice'
import { getFromLocalStorage } from '../../utils/localStorage'
import useLogout from '../../hooks/useLogout'
// import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = getFromLocalStorage('chat-user')
	const { logout } = useLogout()

	// const logout = () => {
	// 	dispatch(removeUser())
	// 	dispatch(removeToken())
	// 	dispatch(clearMessages())

	// 	navigate('/login', { replace: true })
	// 	// console.log('logout called')
	// }

	return (
		<a onClick={logout} title='Logout'>
			<i className='fa fa-power-off fa-2x'></i>
			<span className='nav-text'>{`Logout ${user?.username}`}</span>
		</a>
	)
}
export default LogoutButton
