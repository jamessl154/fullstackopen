import React, { useRef } from 'react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

const BlogDisplay = ({ username, handleLogout, blogs, addBlog, setBlogs, user }) => {

  const toggleRef = useRef()

  return (
    <div className='bloglist'>
      <h1>Blogs</h1>
      <p>{username} is logged in {' '}
        <button onClick={handleLogout}>Logout</button>
      </p>

      <Togglable buttonLabel="Add a new Blog" ref={toggleRef}>
        {/* 
          pass toggleRef as a ref to Togglable
          but as a prop to AddBlogForm
        */}
        <AddBlogForm addBlog={addBlog} toggleRef={toggleRef} />
      </Togglable>
      
      <h2>Existing blogs</h2>
      {blogs.map(blog => 
        <Blog 
          key={blog.id} 
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />)}
    </div>
  )
}

export default BlogDisplay