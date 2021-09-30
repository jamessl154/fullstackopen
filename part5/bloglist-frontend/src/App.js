import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    // TODO create blogService.post and use here

    let newBlog = () => {
      <div>
       {title} {author}
      </div>
    }

    setBlogs(blogs.concat(newBlog))
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
        <h1>Blogs</h1>
        <span>{user.username} is logged in {' '}
          <button onClick={handleLogout}>Logout</button>
        </span>

        <h3>Add a new blog</h3>
        <form onSubmit={addBlog}>
          <div className='container'>
            <label htmlFor='title'>Title:</label>
            <input id='title' type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
            <label htmlFor='author'>Author:</label>
            <input id='author' type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
            <label htmlFor='url'>Url:</label>
            <input id='url' type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
          </div>
          <button type="submit" >Add</button>
        </form>

        <h3>Existing blogs</h3>
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