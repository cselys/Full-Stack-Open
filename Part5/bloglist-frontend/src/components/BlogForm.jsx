import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    if(title && author && url){
      createBlog({ title, author, url })
      setCreateBlogVisible(false)
      resetForm()
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleurlChange = (event) => {
    setUrl(event.target.value)
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
    return (<form onSubmit={handleCreateBlog}>
      <div>
        <div style={hideWhenVisible}>
          <button type="button" onClick={() => setCreateBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <div>
              title: <input placeholder='write title here' value={title} onChange={handleTitleChange} />
          </div>
          <div>
              author: <input placeholder='write author here' value={author} onChange={handleAuthorChange} />
          </div>
          <div>
              url: <input className='url' placeholder='write url here' value={url} onChange={handleurlChange} />
          </div>
          <button type="submit">create</button>
          <p><button  type="button" onClick={() => setCreateBlogVisible(false)}>cancel</button></p>
        </div>
      </div>
    </form> )
  }

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      {blogForm()}
    </div>
  )

}

export default BlogForm