import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Blog component renders a blog`s title and author,\
    but not url or likes by default', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 10
  }

  const component = render(
    <Blog blog={blog} />
  )

  const foundBlog = component.container.querySelector('.blog')

  expect(foundBlog).toHaveTextContent('testTitle')
  expect(foundBlog).toHaveTextContent('testAuthor')
  expect(foundBlog).not.toHaveTextContent('testUrl')
  expect(foundBlog).not.toHaveTextContent('Likes')
})