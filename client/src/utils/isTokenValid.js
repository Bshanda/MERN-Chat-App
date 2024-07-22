import Paths from '../constants/Paths'

export const checkTokenValidity = async () => {
  try {
  const r = await fetch(`${Paths.Auth.checkToken}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicat ion/json',
      Authorization: `Bearer ${localStorage.getItem('auth')}`
    }
  })

  if (!r) return false
  const json = await r?.json()
  console.log('Check token:-',json);
  if (json?.error) {
    return false
  }
  if (json?.validToken === true) return true
   return false
} catch (error) {
    console.log('Error',error);
    return false
  } 
}
