import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Notification from './components/Notification'
import { notifyWith } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        // On first render send getAll request then render all blogs sorted by likes
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      // Re-save the token to a variable for the blogService
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with...', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInBloglistUser',
        JSON.stringify(user)
      )
      dispatch(notifyWith(`${username} logged in successfully!`, 'success'))
      // Save the token in a variable for the blogService
      blogService.setToken(user.token)
      // user contains the name, username and token of the logged in user
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notifyWith('Wrong username or password.', 'error'))
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    dispatch(notifyWith(`${user.username} logged out successfuly!`, 'success'))
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    // Successful addBlog responds with the blog that was added
    let response = await blogService.addBlog(newBlog)
    // state 'blog' array of blog objects gets passed down
    // through component BlogDisplay to Blog where the array is mapped
    // on the html in a div of blog.title blog.author
    setBlogs(blogs.concat(response))
    dispatch(notifyWith(`"${newBlog.title}" by ${newBlog.author} added`, 'success'))
  }

  return (
    <div>

      <Notification />

      { user === null
        ?
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />
        :
        <BlogDisplay
          username={user.username}
          handleLogout={handleLogout}
          blogs={blogs}
          addBlog={addBlog}
          setBlogs={setBlogs}
          user={user}
        />
      }
    </div>
  )
}

export default App