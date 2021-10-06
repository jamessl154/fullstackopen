import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ addBlog, toggleRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    // first creating the blog object,
    // then calling addBlog, sending it to the DB via the backend
    // finally clearing the controlled inputs
    event.preventDefault()

    addBlog({
      'title' : title,
      'author' : author,
      'url' : url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    toggleRef.current.toggleVisibility()
  }

  return (
    <div>
      <h3>New blog</h3>
      <form onSubmit={createBlog}>
        <div className='container'>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor='author'>Author:</label>
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <label htmlFor='url'>Url:</label>
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit' >Add</button>
      </form>
    </div>
  )
}

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  toggleRef: PropTypes.object.isRequired
}

export default AddBlogForm