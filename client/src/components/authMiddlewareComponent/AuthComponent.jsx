import { Navigate } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AuthComponent = ({ children }) => {
  const authUser = useSelector(state=>state.authUser.value) || {}
  useEffect(() => {
    console.log('Auth component called')
  }, [authUser])
  return <>{authUser?._id ? children : <Navigate to={'/login'}></Navigate>}</>
}

export default AuthComponent
