import React from 'react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'

const BlogDisplay = ({ username, handleLogout, addBlog, title, 
    setTitle, author, setAuthor, url, setUrl, blogs }) => {

    return (
      <div>
        <h1>Blogs</h1>
        <span>{username} is logged in {' '}
          <button onClick={handleLogout}>Logout</button>
        </span>

        <AddBlogForm 
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
        />

        <h3>Existing blogs</h3>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
}

export default BlogDisplay