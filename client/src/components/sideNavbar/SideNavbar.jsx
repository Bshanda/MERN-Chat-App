import { useState } from 'react'
import './index.css'
import { sideNavBarContent } from './content'
import { useDispatch, useSelector } from 'react-redux'
import UpdateForm from '../sidebar/user/UpdateForm'
import { useNavigate } from 'react-router-dom'
import { removeToken, removeUser } from '../../features/authUser/authUserSlice'
import { clearMessages } from '../../features/authUser/messagesSlice'

const SideNavbar = () => {
	const [titleVisible, setTitleVisible] = useState(false)
	const user = useSelector((state) => state.authUser.value)

	const showTitle = () => {
		// setTitleVisible(true)
	}

	const hideTitle = () => {
		setTitleVisible(false)
	}

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const logout = () => {
		dispatch(removeUser())
		dispatch(removeToken())
		dispatch(clearMessages())

		navigate('/login', { replace: true })
		// console.log('logout called')
	}

	// return (
	//   <div
	//     id='sideNavbar'
	//     onMouseOver={showTitle}
	//     onMouseLeave={hideTitle}
	//     className={`flex flex-col py-3 px-2 bg-slate-700 text-white text-center transition-all  duration-300`}
	//   >
	//     {sideNavBarContent.map((navItem, i) => (
	//       <div className='font-white mb-4 ' key={i}>
	//         <Link to={navItem.link} className='flex items-center justify-center'>
	//           <div className='m-auto flex flex-col justify-center'>
	//             {navItem.icon}
	//             <span className='text-[15px] font-semibold'>{navItem.title}</span>
	//           </div>
	//         </Link>
	//       </div>
	//     ))}
	//     <div className='mt-auto'>
	//       <CurrentUser />
	//     </div>
	//   </div>
	// )

	return (
		<div className='flex-grow'>
			<nav className='main-menu'>
				<ul className='top'>
					{sideNavBarContent?.top?.map((ele) => (
						<li>
							<a href='#'>
								{ele?.icon}
								<span className='nav-text'>{ele?.title}</span>
							</a>
						</li>
					))}
				</ul>

				<ul className='bottom'>
					{sideNavBarContent.bottom.map((ele, i) => (
						<li onClick={ele.onclick ? ele.onclick : ''}>
							{ele.component ? (
								ele.component
							) : (
								<a href='#'>
									{ele?.icon}
									<span className='nav-text'>{ele?.title}</span>
								</a>
							)}
						</li>
					))}

					{/* Modal for updating user details */}
					<dialog id='my_modal_3' className='modal'>
						<div className='modal-box'>
							<form method='dialog'>
								{/* if there is a button in form, it will close the modal */}
								<h3 className='font-bold text-lg text-black'>Update User!</h3>
								<button
									className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-500 hover:animate-spin'
									onClick={() => document.getElementById('my_modal_3').closeModal()}>
									✕
								</button>
							</form>
							<UpdateForm />
						</div>
					</dialog>
				</ul>
			</nav>
		</div>
	)
}

export default SideNavbar
