import { useState } from 'react'
import Paths from '../constants/Paths'
import { getFromLocalStorage } from '../utils/localStorage'
import toast from 'react-hot-toast'

const useUpdateSelfUser = () => {
  const [loading, setLoading] = useState(false)
  const token = getFromLocalStorage('auth')

  const updateUser = async updates => {
    try {
      const res = await fetch(Paths.Users.UpdateSelf, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      })

      const json = await res?.json()

      if (!json) throw new Error('no response')

      if (json?.error) {
        throw new Error(json?.error)
      }

      toast.success(json.message)
      return { data: json?.data, message: json?.message }
    } catch (error) {
      toast.error(error.message)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }
  return { loading, updateUser }
}

export default useUpdateSelfUser
