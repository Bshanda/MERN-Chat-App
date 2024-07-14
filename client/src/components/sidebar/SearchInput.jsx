import { IoSearchSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setSelectedChat } from '../../features/authUser/selectedChatSlice'

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const [filteredChats, setFilteredChats] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const chatList = useSelector(state => state.chatList.value) || []
  const dispatch = useDispatch()

  const searchUsers = e => {
    // prevents the default form behaviour
    e.preventDefault()

    setTimeout(() => {
      setIsSearching(true)
      //do nothing if search is empty.
      if (search.length == 0) {
        setIsSearching(false)
        return setFilteredChats([])
      }

      // Filtering chats.
      const filtered = chatList.filter(chat =>
        chat.username.toLowerCase().includes(search.toLowerCase())
      )

      setFilteredChats(filtered)
    }, 100)
  }

  const handleSearchedItemClick = chat => {
    dispatch(setSelectedChat(chat))
    setFilteredChats([])
    setSearch('')
    setIsSearching(false)
  }

  return (
    <div className='' autoComplete='off'>
      <div className='flex items-center'>
        <input
          name='search'
          placeholder='Search'
          className='search w-56 input input-bordered rounded-full border focus:border-sky-500'
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
          onKeyUp={e => {
            searchUsers(e)
          }}
        />
        {/* <button
          type='submit'
          className='searchBtn btn btn-circle bg-sky-500 text-white'
          onClick={searchUsers}
        >
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button> */}
      </div>

      {isSearching && filteredChats.length != 0 && (
        <ul className='menu bg-base-200 rounded-box w-56'>
          {filteredChats?.map(chat => {
            return (
              <li
                className='hover:bg-sky-500 rounded-md'
                onClick={() => {
                  handleSearchedItemClick(chat)
                }}
                key={chat._id}
              >
                <a>{chat.username}</a>
              </li>
            )
          })}
        </ul>
      )}

      {isSearching && filteredChats.length == 0 && <NoChatFound />}
    </div>
  )
}

export default SearchInput

const NoChatFound = () => {
  return (
    <ul className='menu bg-base-200 rounded-box w-56'>
      <li className='hover:bg-sky-500 rounded-md'>
        <a>no chat found</a>
      </li>
    </ul>
  )
}

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
