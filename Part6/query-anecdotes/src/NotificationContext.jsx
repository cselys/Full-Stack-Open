import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
        return action.payload
    case "REMOVE":
        return ''
    default:
        return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () =>{
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () =>{
  return useContext(NotificationContext)[1]
}
export default NotificationContext
