import { useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { useState } from 'react'
import Options from './Options'

const CurrentUser = () => {
	const user = useSelector((state) => state.authUser.value)
	const [userOptions, setUserOption] = useState(false)

	const toggleOptions = () => {
		setUserOption(!userOptions)
	}

	return (
		<div className='dropdown dropdown-top fa mx-auto block'>
			<div tabIndex={0} role='button' className='btn-circle h-auto w-auto p-0 m-0 '>
				<Avatar avatar={user?.profilePic} />
			</div>
		</div>
	)
}

export default CurrentUser
