import { BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { removeToken, removeUser } from '../../features/authUser/authUserSlice'
import { useNavigate } from 'react-router-dom'
// import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(removeUser())
    dispatch(removeToken())

    navigate('login')
    // console.log('logout called')
  }

  return (
      <div className='mt-auto' onClick={logout}>
      <BiLogOut className='w-6 h-6 cursor-pointer' />
    </div>
  )
}
export default LogoutButton
