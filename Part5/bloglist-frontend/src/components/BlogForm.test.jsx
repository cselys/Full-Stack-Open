import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputT = screen.getByPlaceholderText('write title here')
  const inputA = screen.getByPlaceholderText('write author here')
  const inputU = screen.getByPlaceholderText('write url here')

  const createButton = screen.getByText('create')

  await user.type(inputT, 'unit test title')
  await user.type(inputA, 'unit test author')
  await user.type(inputU, 'http://unittest')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('unit test title')
  expect(createBlog.mock.calls[0][0].author).toBe('unit test author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://unittest')
})