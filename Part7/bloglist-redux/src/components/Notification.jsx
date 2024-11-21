import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector( ({notification}) => {
    return notification
  })

  if(notification.startsWith('wrong') || notification.startsWith('error'))
    return (
      (<div className='error'>
        {notification}
      </div>)
    )
  return (
    (<div className='info'>
      {notification}
    </div>)
  )
}

export default Notification