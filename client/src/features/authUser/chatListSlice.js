import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value:[] 
}

const chatListSlice = createSlice({
    name:'chatList',
    initialState,
    reducers:{
        addToChatList:(state, action)=>{
            state.value = action.payload
        } 
    }
})

export const {addToChatList} = chatListSlice.actions

export default chatListSlice.reducer