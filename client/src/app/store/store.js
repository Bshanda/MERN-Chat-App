import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../../features/authUser/authUserSlice'
import selectedChatReducer from '../../features/authUser/selectedChatSlice'
import messagesSliceReducer from '../../features/authUser/messagesSlice'
import chatListSliceReducer from '../../features/authUser/chatListSlice'

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    selectedChat: selectedChatReducer,
    messages: messagesSliceReducer,
    chatList: chatListSliceReducer
  }
})
