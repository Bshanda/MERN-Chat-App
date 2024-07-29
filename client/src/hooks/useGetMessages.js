import { useEffect, useState } from 'react'
import Paths from '../constants/Paths'
import { useDispatch, useSelector } from 'react-redux'
import { setHasMore, setMessages } from '../features/authUser/messagesSlice'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const selectedChat = useSelector(state => state.selectedChat?.value)
  const hasMore = useSelector(state => state.messages?.hasMore)
  const dispatch = useDispatch()

  const getMessages = ({ signal = undefined, skip }) => {
    // return if no conversation is selected.
    setLoading(true)
    if (!selectedChat) {
      setLoading(false)
      console.log('Chat not selected')
      return
    }

    if (hasMore == false) {
      setLoading(false)
      console.log('Has no more massages')
      return
    }

    // console.log('Fetch from:-', selectedChat)

    // api endpoints for fetching a chat.
    const chatApi = Paths.Message.GetChat
    const messageApi = `${chatApi}${selectedChat?._id}/${skip}`

    console.log('Fetch chat called', messageApi)

    // fetch conversation.

    // requesting conversation.
    fetch(messageApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'applicat ion/json',
        Authorization: `Bearer ${localStorage.getItem('auth')}`
      },
      signal
    })
      .then(async r => {
        // converting readable stream to a json object.
        const decodedMessages = await r.json()
        console.log('get msg:-', decodedMessages.data)

        // return if no conversation.
        if (decodedMessages.data?.length == 0 || decodedMessages.data == null) {
          setLoading(false)
          dispatch(setHasMore(false))
          return
        }
        //set 'hasMore' flag  to true if users recieve chats and are >= 20 chat.
        dispatch(setHasMore(true))

        // decodedMessages.reverse()

        // set 'hasMore' flags to "false" is loaded messages are less than 20.
        if (decodedMessages.data?.length < 20) {
          dispatch(setHasMore(false))
        }

        setLoading(false)
        // console.log('Fetched chats :-', typeof decodedMessages.data)
        // save to message slice in redux.

        // const reversedData = decodedMessages.data.

        dispatch(setMessages(decodedMessages.data))
        return
      })
      .catch(e => {
        console.log(e.message)
      })
      .finally(setLoading(false))
  }

  return { getMessages, loading }
}

export default useGetMessages
