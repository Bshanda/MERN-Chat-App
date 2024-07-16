import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  filteredChats: [],
  isFilteringChats: false
}

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    addToChatList: (state, action) => {
      state.value = action.payload
    },
    filterChats: (state, action) => {
      state.filteredChats = action.payload
    },
    isSearching: (state, action) => {
      state.isFilteringChats = action.payload
    }
  }
})

export const { addToChatList, isSearching, filterChats } = chatListSlice.actions

export default chatListSlice.reducer
