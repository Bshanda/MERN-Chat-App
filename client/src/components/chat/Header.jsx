import { useDispatch } from "react-redux"
import { removeSelectedChat } from "../../features/authUser/selectedChatSlice"

const Header = ({ selectedChat }) => {
    const dispatch = useDispatch()
    const handleCloseChat = ()=>{
        // console.log('Chat closed');
        dispatch(removeSelectedChat())
    }
  return (
    <div
      className='flex justify-between flex-row-reverse items-center bg-white p-2 outline
  outline-3  outline-green-400 rounded-md'
    >
      <button className='btn btn-square btn-sm bg-red-500 border-none hover:bg-red-600 text-white' 
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
      </button>

      <span className='p-2'>to: {selectedChat?.username}</span>
    </div>
  )
}

export default Header
