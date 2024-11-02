
export const Notification = ({message}) => {
	if(message === null) {
		return null
	}
	
	if(!message.startsWith('Information of'))
		return (
			(<div className='info'>
			   {message}
			</div>)	
		)
	return (
			(<div className='error'>
			   {message}
			</div>)	
		)
	
}