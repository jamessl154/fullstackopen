import React, { useRef } from 'react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogDisplay = ({ username, handleLogout, blogs,
  addBlog, setBlogs, user }) => {

  const toggleRef = useRef()

  const handleRemove = async (blog) => {

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

  const handleLike = async (blog) => {

    let updatedBlog = {
      author: blog.author,
      id: blog.id,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    }

    const response = await blogService.addLikes(blog.id, updatedBlog)

    let sortedBlogs =
      blogs
        // filter returns a new array where the blog with
        // the old number of likes is removed
        .filter((x) => x.id !== blog.id)
        // concatenate blog with updated likes
        .concat(response)
        // sort by highest likes
        .sort((a, b) => b.likes - a.likes)

    setBlogs(sortedBlogs)
  }

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
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
        />)}
    </div>
  )
}

export default BlogDisplay