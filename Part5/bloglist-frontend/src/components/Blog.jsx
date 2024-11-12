import { useState } from 'react'
import PropTypes from 'prop-types'
import Blogdetails from './Blogdetails'

const Blog = ({ userid, blog, updateBlog, removeBlog }) => {
  const [showBlog, setShowBlog] = useState(false)

  const updateBloglikes = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    await updateBlog(blog.id, updatedBlog)
  }

  const removeBlogItem = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remobe blog ${blog.title} by  ${blog.author}`)){
      await removeBlog(blog.id)
    }
  }

  return (
    <div className='blog'>
      <div>
        {blog.title} (Author: {blog.author})<button className='viewDetails' type="button" onClick={() => setShowBlog(!showBlog)}>view</button>
      </div>
      {showBlog &&  <Blogdetails blog={blog} updateBloglikes={updateBloglikes} removeBlogItem={removeBlogItem} showRemove={userid===blog.user || userid===blog.user.id}/>}
    </div>
  )
}

Blog.propTypes = {
  blog:PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog