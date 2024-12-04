import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Notification = () => {
  const notification = useSelector( ({notification}:RootState) => {
    return notification
  })

  if(notification.startsWith('wrong') || notification.startsWith('error'))
    return (
      (<div style={{ color: 'red' }}>
        {notification}
      </div>)
    )
  return (
    (<div style={{ color: 'green' }}>
      {notification}
    </div>)
  )
}

export default Notification