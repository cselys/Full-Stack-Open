import NotificationContext from '../NotificationContext'
import { useContext, useEffect } from 'react'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE' }); // Dispatch 'REMOVE' action to clear the notification
      }, 5000);

      // Clean up the timeout when the component is unmounted or notification changes
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]); 

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={style}>      
      {notification}
    </div>
  )
}

export default Notification
