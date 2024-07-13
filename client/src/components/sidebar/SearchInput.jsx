import { Form } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'
import { useState } from 'react'
import useChatListFetch from '../../hooks/useChatListFetch'
import { useSelector } from 'react-redux'

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const [filteredChats, setFilteredChats] = useState([])
  const chatList = useSelector(state => state.chatList.value)

  const searchUsers = e => {
    // prevents the default form behaviour
    e.preventDefault()
    const filtered = chatList.filter(chat => {
      return chat.username.includes(search)
    })

    setFilteredChats(filtered)
    // setChatList(searchedChat)
    console.log(filteredChats)
  }
  return (
    <div className='flex items-center gap-2 my-4 relative' autoComplete='off'>
      <input
        name='search'
        placeholder='Search'
        className='search input input-bordered rounded-full border border-black'
        value={search}
        onChange={e => {
          setSearch(e.target.value)
        }}
      />

      <button
        type='submit'
        className='searchBtn btn btn-circle bg-sky-500 text-white'
        onClick={searchUsers}
      >
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>

      {filteredChats.length > 0 && (
        <>
          {filteredChats?.map(chat => {
            return <div className='absolute b[-10px]'>{chat.fullname}</div>
          })}
        </>
      )}
    </div>
  )
}

export default SearchInput

// import { useState } from 'react'
// import { IoSearchSharp } from 'react-icons/io5'
// import useConversation from '../../zustand/useConversation'
// import useGetConversations from '../../hooks/useGetConversations'
// import toast from 'react-hot-toast'

// const SearchInput = () => {
//   const [search, setSearch] = useState('')
//   const { setSelectedConversation } = useConversation()
//   const { conversations } = useGetConversations()

//   const handleSubmit = e => {
//     e.preventDefault()
//     if (!search) return
//     if (search.length < 3) {
//       return toast.error('Search term must be at least 3 characters long')
//     }

//     const conversation = conversations.find(c =>
//       c.fullName.toLowerCase().includes(search.toLowerCase())
//     )

//     if (conversation) {
//       setSelectedConversation(conversation)
//       setSearch('')
//     } else toast.error('No such user found!')
//   }
//   return (
//     <form onSubmit={handleSubmit} className='flex items-center gap-2'>
//       <input
//         type='text'
//         placeholder='Search…'
//         className='input input-bordered rounded-full'
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//         <IoSearchSharp className='w-6 h-6 outline-none' />
//       </button>
//     </form>
//   )
// }
// export default SearchInput
