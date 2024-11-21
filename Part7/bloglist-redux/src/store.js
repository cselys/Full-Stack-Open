import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import blogReducer from './reducers/blogReducer.js'
import loginReducer from './reducers/loginReducer.js'
import userblogReducer from './reducers/userblogReducer.js'

const store = configureStore ({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    userblog: userblogReducer
  }
})

export default store