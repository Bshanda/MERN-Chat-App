import { useDispatch } from 'react-redux'
import { removeSelectedChat } from '../../features/authUser/selectedChatSlice'

const Header = ({ selectedChat }) => {
  const dispatch = useDispatch()
  const handleCloseChat = () => {
    // console.log('Chat closed');
    dispatch(removeSelectedChat())
  }
  return (
    <div className='flex justify-between items-center relative p-2 rounded-md bg-slate-700 text-white'>
      {/* <button className='btn btn-square btn-sm bg-red-500 border-none hover:bg-red-600 text-white' 
      title="click to close chat"
      onClick={handleCloseChat}
      >

        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button> */}
      <span className='p-2'>to: {selectedChat?.username}</span>
      <button
        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-3'
        title='click to close chat'
        onClick={handleCloseChat}
      >
        ✕
      </button>
    </div>
  )
}

export default Header
