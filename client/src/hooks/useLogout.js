import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeToken, removeUser } from '../features/authUser/authUserSlice'
import { clearMessages } from '../features/authUser/messagesSlice'
import toast from 'react-hot-toast'

const useLogout = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const logout = () => {
		setLoading(true)
		try {
			dispatch(removeUser())
			dispatch(removeToken())
			dispatch(clearMessages())

			// navigate('/login', { replace: true })
			toast.success('Logged out')
		} catch (error) {
			toast.error(error.message)
			// alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return { logout, loading }
}

export default useLogout
