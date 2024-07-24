import LogoutButton from '../LogoutButton'
import Settings from './Settings'
import UpdateForm from './UpdateForm'

const Options = () => {
  return (
    <ul className=''>
      <li className='p-2'>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className='btn'
          onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          <Settings />
        </button>
        <dialog id='my_modal_3' className='modal'>
          <div className='modal-box'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                ✕
              </button>
            </form>
            ;<h3 className='font-bold text-lg'>Update User!</h3>
            <UpdateForm />
          </div>
        </dialog>
      </li>
      <li className='p-2'>
        <button className='btn'>
          <LogoutButton />
        </button>
      </li>
    </ul>
  )
}

export default Options
