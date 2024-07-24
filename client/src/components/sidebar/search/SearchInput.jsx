// import { IoSearchSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react' 
import { useDebounce } from '../../../hooks/useDebounce'
import { useChatContext } from '../../../context/ChatContext'
// import useChatSearch from '../../hooks/useChatListSearch'

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const { filterChats } = useChatContext()

  const debouncedSearch = useDebounce(search)
  useEffect(() => {
    console.log('Searched')
    filterChats(debouncedSearch)
  }, [debouncedSearch])

  return (
    <div className=''>
      <div className='flex items-center'>
        <input
          name='search'
          placeholder='Search'
          className='search w-56 input input-bordered text-black rounded-full border focus:border-sky-500'
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
          autoComplete='off'
        />
      </div>
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
