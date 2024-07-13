import { useState } from 'react'
// import { useAuthContext } from '../context/AuthContext'
import Paths from '../constants/Paths.js'
import { useDispatch } from 'react-redux'
import { addUser } from '../features/authUser/authUserSlice.js'
import toast from 'react-hot-toast'

const useSignup = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const signup = async ({ fullname, username, password, gender }) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      gender
    })

    if (!success) return

    setLoading(true)

    let userData = { fullname, username, password, gender }

    try {
      const res = await fetch(`${Paths.Auth.Signup}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      let resData = await res.json()
      console.log(resData)

      // Error handling
      if (resData.error) {
        throw new Error(resData.error)
      }

      // If user created succesfully
      // using dispatch for react redux
      dispatch(addUser(resData))

      // console.log(resData)

      // React hot toast.
      toast.success('User created')
    } catch (error) {
      toast.error(error.message)
      // return { msg: error.message, error: '' }
    } finally {
      setLoading(false)
    }
  }

  return { loading, signup }
}

export default useSignup

const handleInputErrors = ({
  fullname,
  username,
  password,

  gender
}) => {
  if (!fullname || !username || !password || !gender) {
    console.log('Please fill all the inputs')
    return false
  }

  if (password.length <= 6) {
    console.log('Password must be more than 6 characters')
    return false
  }

  // Define the regular expression pattern
  // ^ and $ are anchors that ensure the pattern applies to the entire string.
  // (?=.*[a-b]) ensures there is at least one lowercase letter from a to b.
  // (?=.*[0-9]) ensures there is at least one digit.
  // (?=.*[!@#$%^&*(),.?":{}|<>]) ensures there is at least one special character.
  // .{8,} ensures the password is at least 8 characters long.

  // You can adjust the special characters inside the square brackets to include or exclude s
  // pecific characters as needed.

  const pattern = /^(?=.*[a-b])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])$/

 if (!pattern.test(password)) {
  console.log("password must include atleast one lowerCase letter, one digit, one special charactor");
  return false
 } 

  //   if (password !== confirmPassword) {
  //     console.log('Password donot match')
  //     return false
  //   }

  return true
}
