import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Blog component renders a blog`s title and author,' +
  ' but not url or likes by default', () => {

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

describe('When View button is clicked for a blog', () => {
  let component

  beforeEach(() => {

    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 10,
      user: {
        username: 'testUsername'
      }
    }

    const user = {
      username: 'testUsername'
    }

    component = render(
      <Blog blog={blog} user={user} />
    )

    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
  })

  test('the blog expands', () => {
    expect(component.container.querySelector('.expandedBlog')).toBeDefined()
  })

  // test('If like button is clicked twice, the event handler from' +
  // ' its props is called twice', async () => {

  //   component.debug()

  //   const likeButton = component.getByText('Like')
  //   await fireEvent.click(likeButton)
  //   await fireEvent.click(likeButton)

  //   expect(mockHandler.mock.calls).toHaveLength(2)
  // })
})

