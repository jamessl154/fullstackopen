import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Notification from './components/Notification'
import { notifyWith } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, resetUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
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
    dispatch(resetUser())
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
          handleLogout={handleLogout}
        />
      }
    </div>
  )
}

export default App