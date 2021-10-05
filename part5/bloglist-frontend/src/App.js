import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  // https://studies.cs.helsinki.fi/stats/courses/fullstackopen/solutions/2
  // default type="success"
  const notifyWith = (message, type="success") => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
      notifyWith(`${username} logged in successfuly!`)
      // Save the token in a variable for the blogService
      blogService.setToken(user.token)
      // user contains the name, username and token of the logged in user
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong username or password.', 'error')
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    notifyWith(`${user.username} logged out successfuly!`)
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    // Successful addBlog responds with the blog that was added
    let response = await blogService.addBlog(newBlog)
    // state 'blog' array of blog objects gets passed down
    // through component BlogDisplay to Blog where the array is mapped
    // on the html in a div of blog.title blog.author
    setBlogs(blogs.concat(response))
    notifyWith(`"${newBlog.title}" by ${newBlog.author} added`)
  }

  return (
    <div>
      
      <Notification notification={notification} />

      { user === null 
        ? <LoginForm
            username={username} 
            password={password} 
            handleLogin={handleLogin}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        : <BlogDisplay
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