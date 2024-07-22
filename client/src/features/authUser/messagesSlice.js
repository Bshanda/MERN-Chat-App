import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  hasMore: true,
  scrollToBottom: true
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      if (state.value?.length == 0) {
        console.log('Messages setted', action.payload)
        state.scrollToBottom = true
        state.value = action.payload
        return
      }
      state.scrollToBottom = false
      state.value = [...action.payload, ...state.value]
    },
    clearMessages: state => {
      state.value = []
    },
    addMessages: (state, action) => {
      console.log('Msg slice have masseges')
      if (action?.payload !== null || undefined || 0) {
        state.value = [...state.value, ...action.payload]
      }
    },
    addOneMessage: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload
    },
    setScrollToBottom: (state, action) => {
      state.scrollToBottom = action.payload
    }
  }
})

export const {
  setMessages,
  addMessages,
  addOneMessage,
  clearMessages,
  setHasMore,
  setScrollToBottom
} = messagesSlice.actions

export default messagesSlice.reducer
