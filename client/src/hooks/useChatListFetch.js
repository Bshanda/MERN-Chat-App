import { useState } from 'react'
import Paths from '../constants/Paths'
import { useDispatch } from 'react-redux'
import { addToChatList } from '../features/authUser/chatListSlice'

const useChatListFetch = () => {
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const fetchChatList = (signal) => {
		setLoading(true)

		const usersApi = Paths.Users.GetFriendList
		// console.log('User api :-', usersApi)
		fetch(usersApi, {
			method: 'GET',
			headers: {
				// 'Content-Type': 'applicat ion/json',
				Authorization: `Bearer ${localStorage.getItem('auth')}`
			},
			signal
		})
			.then(async (r) => {
				const chatListDecode = await r.json()

				if (chatListDecode.error) {
					throw new Error(chatListDecode.error)
				}

				if (chatListDecode.length == 0) {
					console.log('No friends')
				}

				dispatch(addToChatList(chatListDecode))
				console.log(chatListDecode)
			})
			.catch((e) => {
				console.log(e)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return { loading, fetchChatList }
}

export default useChatListFetch
