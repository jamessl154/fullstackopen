import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'

import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import UserDisplay from './UserDisplay'
import User from './User'
import SingleBlog from './SingleBlog'
import LoggedIn from './LoggedIn'
import NavLink from './NavLink'
import { postBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { notifyWith } from '../reducers/notificationReducer'
import { initializeUsers, removeFromBlogsArray } from '../reducers/usersReducer'
import { resetUser } from '../reducers/userReducer'

const BlogDisplay = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const toggleRef = useRef()

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    dispatch(notifyWith(`${user.username} logged out successfully!`, 'success'))
    dispatch(resetUser())
    history.push('/')
  }

  return (
    <div className='bloglist'>
      <LoggedIn username={user.username} handleLogout={handleLogout} />
      <Router>
        <Switch>
          <Route exact path="/blogs">
            <NavLink disabledButton='/blogs' />
            <Typography variant='h3' className='pageTitle'>Blogs</Typography>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={() => handleLike(blog)}
                handleRemove={() => handleRemove(blog)}
              />)}
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
          </Route>
          <Route exact path='/blogs/:id'>
            <SingleBlog blogs={blogs} handleLike={handleLike} />
          </Route>
          <Route exact path="/users">
            <NavLink disabledButton='/users' />
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