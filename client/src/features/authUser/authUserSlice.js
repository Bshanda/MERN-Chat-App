import { createSlice } from '@reduxjs/toolkit'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '../../utils/localStorage'

const user = getFromLocalStorage('chat-user') ?? null
const token = getFromLocalStorage('auth') ?? null

const initialState = {
  value: user,
  token: token
}

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload
      saveToLocalStorage({ key: 'chat-user', value: state.value })
    },
    removeUser: state => {
      state.value = null
      removeFromLocalStorage('chat-user')
    },
    addToken: (state, action) => {
      state.token = action.payload
      saveToLocalStorage({ key: 'auth', value: state.token })
    },
    removeToken: state => {
      state.token = null
      removeFromLocalStorage('auth')
    }
  }
})

export const { addUser, removeUser, addToken, removeToken } =
  authUserSlice.actions

export default authUserSlice.reducer
