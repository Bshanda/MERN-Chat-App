import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
  value: null
}

export const selectedChatSlice = createSlice({
  name: 'selectedChat',
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.value = action.payload 
    },
    removeSelectedChat: state => {
      state.value = null
    }
  }
})

export const { setSelectedChat, removeSelectedChat } = selectedChatSlice.actions

export default selectedChatSlice.reducer
