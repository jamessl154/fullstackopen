import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [toggle, setToggle] = useState(true)
  const [likes, setlikes] = useState(blog.likes)

  const buttonToggle = () => setToggle(!toggle)

  const handleRemove = async () => {
  
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      // send the delete request to the backend
      await blogService.removeBlog(blog.id)

      // Maybe need to notify later 
      // when users trying to delete blogs they didnt add
      // console.log(response)

      // remove the blog from the render
      let filteredBlogs = blogs.filter(x => x.id !== blog.id)
      setBlogs(filteredBlogs)
    }
  }

  const handleLike = async () => {

    let updatedBlog = {
        author: blog.author,
        id: blog.id,
        title: blog.title,
        likes: likes + 1,
        url: blog.url,
        user: blog.user.id
      }

    setlikes(likes + 1)

    const response = await blogService.addLikes(blog.id, updatedBlog)

    let sortedBlogs =
      blogs
        // filter returns a new array
        .filter((x) => x.id !== blog.id)
        .concat(response)
        .sort((a, b) => b.likes - a.likes)

    setBlogs(sortedBlogs)
  }

  return (
    <div className='blog'>
      {/* if toggle true or false */}
      { toggle
        ? <div>
            "{blog.title}" by {blog.author}{' '}
            <button onClick={buttonToggle}>View</button>
          </div>
        : <div>
            "{blog.title}" by {blog.author}{' '}
            <button onClick={buttonToggle}>Hide</button>
            <div>
              Added by: {blog.user.username}<br />
              Total Likes: {likes}{' '}
              <button onClick={handleLike}>Like</button><br />
              Url: {blog.url}<br />
              <button onClick={handleRemove}>Remove</button>
            </div>
          </div>
      }
    </div>
  )
}

export default Blog