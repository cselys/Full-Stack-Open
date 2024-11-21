import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'title testing with react-testing-library',
    author: 'author test',
    url:'http://test'
  }
  const updateBlog =() => { }
  const removeBlog = () => {}

  render(<Blog userid={'id'} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />)

  const element = screen.getByText(`${blog.title} (Author: ${blog.author})`)
  expect(element).toBeDefined()
  const elementUrl = screen.queryByText(blog.url)
  expect(elementUrl).toBeNull()
})

describe('Show details button click', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'title testing with react-testing-library',
      author: 'author test',
      url:'http://test',
      likes:5
    }
    const updateBlog =() => { }
    const removeBlog =() => {}

    container = render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>).container
  })

  test('at start the details are not displayed', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).toBeNull()
  })

})
