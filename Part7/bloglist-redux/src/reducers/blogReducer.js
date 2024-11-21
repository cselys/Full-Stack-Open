import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const getId = () => (100000 * Math.random()).toFixed(0)

const compareBlogLikes = (a,b) => {
    return b.likes - a.likes
}

const blogSlice = createSlice ({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
      state.sort(compareBlogLikes)
    },
    setBlogs(state,action) {
      return action.payload
    },
    removeBlog(state,action) {
      return state.filter(b => b.id !== action.payload).sort(compareBlogLikes)
    },
    voteBlog(state,action) {
      const updatedBlog = action.payload
      return state.map( b => b.id === updatedBlog.id ? updatedBlog: b ).sort(compareBlogLikes)
    }
  },
})

export const { appendBlog, setBlogs, removeBlog, voteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(compareBlogLikes)))
  }
}

export const clearBlogs = () => {
    return async dispatch => {
      dispatch(setBlogs([]))
    }
  }

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlogByID = id => {
    return async dispatch => {
        const result = await blogService.remove(id)
        if(result.status === 204){
            dispatch(removeBlog(id))
        }
    }    
}

export const udpateBlogVotes = (id, blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.update(id, blogObject)
        if(newBlog){
            dispatch(voteBlog(blogObject))
        }
    }
  }

  export default blogSlice.reducer