import React, { useEffect, useRef } from 'react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import UserDisplay from './UserDisplay'
import User from './User'
import SingleBlog from './SingleBlog'
import LoggedIn from './LoggedIn'
import { postBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { notifyWith } from '../reducers/notificationReducer'
import { initializeUsers, removeFromBlogsArray } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const BlogDisplay = ({ handleLogout }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const toggleRef = useRef()
  // console.log(users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const handleRemove = (blog) => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(notifyWith(`"${blog.title}" removed from the blogs list!`, 'success'))
      dispatch(removeFromBlogsArray(blog))
    }
  }

  const handleAdd = (newBlog) => {
    dispatch(postBlog(newBlog))
    dispatch(notifyWith(`"${newBlog.title}" by ${newBlog.author} added`, 'success'))
  }

  const handleLike = (blog) => {
    // The backend returns a populated user field (mongoose method)
    // when we send GET requests to api/blogs.
    // However, when we send PUT request we need to omit those
    // populated fields or we get 400 Bad requests
    let updatedBlog = { ...blog, likes: blog.likes + 1 , user: blog.user.id }
    dispatch(likeBlog(updatedBlog))
    dispatch(notifyWith(`Liked "${blog.title}"!`, 'success'))
  }

  return (
    <div className='bloglist'>
      <h1>Blog List Application</h1>
      <LoggedIn username={user.username} handleLogout={handleLogout} />
      <Router>
        <Switch>
          <Route exact path="/">
            <div className='navigationBar'>
              <b>Blogs{' '}<Link to="/users">Users</Link></b>
            </div>
            <Togglable
              buttonLabel="Add a new Blog"
              ref={toggleRef}
            >
              {/*
                pass toggleRef as a ref to Togglable
                but as a prop to AddBlogForm
              */}
              <AddBlogForm handleAdd={handleAdd} toggleRef={toggleRef} />
            </Togglable>
            <h2>Existing blogs</h2>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={() => handleLike(blog)}
                handleRemove={() => handleRemove(blog)}
              />)}
          </Route>
          <Route exact path='/blogs/:id'>
            <SingleBlog blogs={blogs} handleLike={handleLike} />
          </Route>
          <Route exact path="/users">
            <div className='navigationBar'>
              <b><Link to="/">Blogs</Link>{' '}Users</b>
            </div>
            <UserDisplay users={users}/>
          </Route>
          <Route exact path="/users/:id">
            <User users={users} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default BlogDisplay