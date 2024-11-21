import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer.js'
import { initializeBlogs, clearBlogs } from './blogreducer.js'

const curUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
const loginSlice = createSlice ({
  name: 'login',
  initialState: curUser || null, 
  reducers: {
    logout(state,action){
      return null
    },
    setUser(state,action){
      return action.payload
    }
  },
})
export const { logout, setUser } = loginSlice.actions
export const singout = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(clearBlogs())
        dispatch(logout())
    }
}

export const singin = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
              username, password
            })
            dispatch(setUser(user))
            window.localStorage.setItem(
              'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(initializeBlogs())
          } catch (exception) {
            dispatch(setNotification('wrong credentials', 3))
          }
    }
}

export default loginSlice.reducer
