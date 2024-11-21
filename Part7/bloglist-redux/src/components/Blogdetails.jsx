import { useDispatch } from 'react-redux'
import { removeBlogByID, udpateBlogVotes } from '../reducers/blogReducer.js'
import { useNavigate } from 'react-router-dom'

const Blogdetails = ({ blog, userid } ) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateBloglikes = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    dispatch(udpateBlogVotes(blog.id, updatedBlog))
  }

  const removeBlogItem = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remobe blog ${blog.title} by  ${blog.author}`)){
      dispatch(removeBlogByID(blog.id))
    }
    navigate('/')
  }

  return   (
    <div className='blogDetails'>
      {blog.url}<br/>
      likes: {blog.likes}  <button className="like-button" type="button" onClick={updateBloglikes}>like</button><br/>
      added by {blog.user.name}<br/>
       {userid===blog.user.id && (
        <button className="remove" type="button" onClick={removeBlogItem}>
          Remove
        </button>
      )}
    </div>
  )
}

export default Blogdetails