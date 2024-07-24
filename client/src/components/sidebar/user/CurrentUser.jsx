import { useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { useState } from 'react'
import Options from './Options'

const CurrentUser = () => {
  const user = useSelector(state => state.authUser.value)
  const [userOptions, setUserOption] = useState(false)

  const toggleOptions = () => {
    setUserOption(!userOptions)
  }

  return (
    <div className='mt-auto relative'> 
      <div className='dropdown dropdown-top'>
        <div tabIndex={0} role='button' className='btn m-1'>
          <Avatar avatar={user?.profilePic} />
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content bg-base-100 rounded-box z-[1] w-auto p-2 shadow'
        >
          <li>
            <Options />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CurrentUser
