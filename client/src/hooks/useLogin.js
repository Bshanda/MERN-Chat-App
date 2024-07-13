import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paths from '../constants/Paths.js'
import { addToken, addUser } from '../features/authUser/authUserSlice.js'
import toast from 'react-hot-toast'

const useLogin = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const login = async ({ username, password }) => {
    const success = handleLoginErrors({ username, password })

    if (!success) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${Paths.Auth.Login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      let resData = await res?.json() // res = {data, Token, status}
      if (resData?.error) {
        throw new Error(resData.error)
      }

      // updaing user state

      // adding user in redux user state for access
      dispatch(addUser(resData?.data))
      dispatch(addToken(resData?.Token))
    } catch (error) {
      console.log(' Error in login hook ', error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin

const handleLoginErrors = ({ username, password }) => {
  if (!username || !password) {
    toast.error('Fill all the inputs')
    return false
  }
  return true
}
