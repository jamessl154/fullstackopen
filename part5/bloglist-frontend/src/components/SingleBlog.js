import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const SingleBlog = ({ blogs, handleLike }) => {
  let id = useParams().id
  let blog = blogs.find((x) => x.id === id)
  if (blogs && blog) {
    return (
      <div>
        <Link to="/">Blogs</Link>{' '}<Link to='/users'>Users</Link>
        <h2>Blog: &quot;{blog.title}&quot; by {blog.author}</h2>
        Url:{' '}<a href={blog.url}>{blog.url}</a><br />
        Total Likes: {blog.likes}{' '}
        <button onClick={() => handleLike(blog)}>Like</button>
        <br />
        <span>added by {blog.user.username}</span><br />
      </div>
    )
  } else {
    return (
      <div>
        <Link to="/">Blogs</Link>{' '}<Link to='/users'>Users</Link>
        <p>{id} is not a valid blog id</p>
      </div>
    )
  }
}

export default SingleBlog