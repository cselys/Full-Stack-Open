import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogdetails from './Blogdetails'

describe('Show details button click', () => {
  let container

  const mockHandler = vi.fn()

  beforeEach(() => {
    const blog = {
      title: 'title testing with react-testing-library',
      author: 'author test',
      url:'http://test',
      likes:5
    }
    const updateBlog =() => { }
    const removeBlog =() => {}

    container = render(<Blogdetails blog={blog} updateBloglikes={mockHandler} removeBlogItem={mockHandler}/>).container
  })

  test('Clicking like button ', async() => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
