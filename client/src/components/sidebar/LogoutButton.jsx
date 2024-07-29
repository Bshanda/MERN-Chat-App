import { BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { removeToken, removeUser } from '../../features/authUser/authUserSlice'

import { useNavigate } from 'react-router-dom'
import { clearMessages } from '../../features/authUser/messagesSlice'
// import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(removeUser())
    dispatch(removeToken())
    dispatch(clearMessages())

    navigate('/login', { replace: true })
    // console.log('logout called')
  }

  return (
    <div className='flex items-center' onClick={logout}>
      <div>
        <BiLogOut size={'30px'} />
      </div>
      <button>LogOut</button>
    </div>
  )
}
export default LogoutButton
