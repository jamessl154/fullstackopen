import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('On first render,', () => {

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
})

describe('When View button is clicked for a blog,', () => {
  let component
  let mockLikes = jest.fn()

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
      <Blog blog={blog} user={user} handleLike={mockLikes}/>
    )

    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
  })

  test('the blog expands', () => {
    expect(component.container.querySelector('.expandedBlog')).toBeDefined()
  })

  test('If the like button is clicked twice, the event handler from' +
  ' its props is called twice', () => {

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikes.mock.calls).toHaveLength(2)
  })
})

