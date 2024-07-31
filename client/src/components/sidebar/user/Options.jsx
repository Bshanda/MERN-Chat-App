import LogoutButton from '../LogoutButton'
import Settings from './Settings'
import UpdateForm from './UpdateForm'

const Options = () => {
	return (
		<ul className=''>
			<li className='p-1 m-1'>
				{/* You can open the modal using document.getElementById('ID').showModal() method */}
				<button className='btn btn-sm' onClick={() => document.getElementById('my_modal_3').showModal()}>
					<Settings />
				</button>
				<dialog id='my_modal_3' className='modal'>
					<div className='modal-box'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<h3 className='font-bold text-lg text-black'>Update User!</h3>
							<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-500 hover:animate-spin' onClick={() => document.getElementById('my_modal_3').closeModal()}>
								✕
							</button>
						</form>
						<UpdateForm />
					</div>
				</dialog>
			</li>
			<li className='p-1'>
				<button className='btn btn-sm m-1'>
					<LogoutButton />
				</button>
			</li>
		</ul>
	)
}

export default Options
