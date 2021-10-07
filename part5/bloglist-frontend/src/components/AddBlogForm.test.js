import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

test('The event handler passed as a prop receives the correct ' +
'details when a new blog is created', () => {

  const addBlog = jest.fn()

  const toggleRef = {
    current: { toggleVisibility: () => null }
  }

  const component = render(
    <AddBlogForm addBlog={addBlog} toggleRef={toggleRef}/>
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')

  fireEvent.change(title, {
    target: { value: 'testTitle' }
  })
  fireEvent.change(author, {
    target: { value: 'testAuthor' }
  })
  fireEvent.change(url, {
    target: { value: 'testUrl' }
  })

  fireEvent.submit(form)
  expect(addBlog.mock.calls).toHaveLength(1)
  // single blog object passed as argument to addBlog
  expect(addBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(addBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(addBlog.mock.calls[0][0].url).toBe('testUrl')
})