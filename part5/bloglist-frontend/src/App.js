import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
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
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
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
      
      // Save the token in a variable for the blogService
      blogService.setToken(user.token)
      // user contains the name, username and token of the logged in user
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

    let newBlog = {
      "title" : title,
      "author" : author,
      "url" : url
    }

    // Successful addBlog responds with the blog that was added
    let response = await blogService.addBlog(newBlog)
    // state 'blog' array of blog objects gets passed down
    // through component BlogDisplay to Blog where the array is mapped
    // on the html in a div of blog.title blog.author
    setBlogs(blogs.concat(response))
  }

  return (
    <div>
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
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            blogs={blogs}
          />
      }
    </div>
  )
}

export default App