import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { udpateBlogVotes } from '../reducers/blogReducer.js'

const Blogs = ({ userid, blog }) => {
  
  const blogs = useSelector( ({ blogs }) => blogs )
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const inputValue = comment;
    if(!inputValue && inputValue.length>0) return
    const updatedBlog = { ...blog, comments: [...blog.comments,inputValue.trim()] }
    dispatch(udpateBlogVotes(blog.id, updatedBlog))
    setComment('')
  }

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  if(blog){
    return (
      <div>
        <h2>blog app</h2>
        <Blog key={blog.id} userid={userid} blog={blog} showdetail={true}/>
        <br/>
        <h2>Comments</h2><br/>
        <textarea
        value={comment}
        onChange={handleComment}
          rows="1"
          cols="40"
          placeholder="Write your comment here"
        />
        <button onClick={handleSubmit}>add comment</button>
        {blog.comments && blog.comments.length > 0 ? blog.comments.map(
            (c,index) => 
            { if (index>0) return (<li key={index}>{c}</li>)}) : null}
      </div>
    )
  }


  if(!blogs)
    return <></>

  return (<>
    {
      blogs.map(blog =>
        <Blog key={blog.id} userid={userid} blog={blog} />)
    }
  </>)
}

export default Blogs