
const Notification = ({ message }) => {
  if(message === null) {
    return null
  }

  if(message.startsWith('wrong') || message.startsWith('error'))
    return (
      (<div className='error'>
        {message}
      </div>)
    )
  return (
    (<div className='info'>
      {message}
    </div>)
  )

}

export default Notification