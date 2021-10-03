import React from 'react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

const BlogDisplay = ({ username, handleLogout, blogs, addBlog }) => {

    return (
      <div>
        <h1>Blogs</h1>
        <span>{username} is logged in {' '}
          <button onClick={handleLogout}>Logout</button>
        </span>

        <Togglable buttonLabel="Add a new Blog">
          <AddBlogForm addBlog={addBlog} />
        </Togglable>

        <h3>Existing blogs</h3>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
}

export default BlogDisplay