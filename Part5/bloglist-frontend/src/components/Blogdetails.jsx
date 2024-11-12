
const Blogdetails = ({ blog, updateBloglikes, removeBlogItem, showRemove } ) => {
  return   (
    <div className='blogDetails'>
      {blog.title}<br/>
      {blog.url}<br/>
        likes: {blog.likes}  <button className="like-button" type="button" onClick={updateBloglikes}>like</button><br/>
      {blog.author}<br/>
      {showRemove && <button className="remove" type="button" onClick={removeBlogItem}>remove</button>}
    </div>
  )
}

export default Blogdetails