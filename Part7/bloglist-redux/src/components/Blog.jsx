import PropTypes from 'prop-types'
import Blogdetails from './Blogdetails'
import { Link } from 'react-router-dom'

const Blog = ({ userid, blog, showdetail }) => {
  
  return (
    <div className='blog'>
      <div>
        {showdetail ? <h2>{blog.title}  (Author: {blog.author})</h2> : 
        (<Link to={`/blogs/${blog.id}`}>{blog.title} (Author: {blog.author})</Link>) }
      </div>
      {(showdetail) && ( <Blogdetails blog={blog} userid={userid}/>)}
    </div>
  )
}

Blog.propTypes = {
  blog:PropTypes.object.isRequired,
}

export default Blog