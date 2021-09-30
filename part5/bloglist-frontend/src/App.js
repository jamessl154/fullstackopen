import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with...', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to the Application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username{' '}
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            Password{' '}
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  const blogDisplay = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.username} is logged in</p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  return (
    <div>
      { user === null 
        ? loginForm()
        : blogDisplay()
      }
    </div>
  )
}

export default App