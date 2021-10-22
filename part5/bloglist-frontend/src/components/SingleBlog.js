import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const SingleBlog = ({ blogs, handleLike }) => {
  const dispatch = useDispatch()
  let id = useParams().id
  let blog = blogs.find((x) => x.id === id)
  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, event.target.comment.value))
  }

  if (blogs && blog) {
    return (
      <>
        <div className='navigationBar'>
          <b><Link to="/">Blogs</Link>{' '}<Link to='/users'>Users</Link></b>
        </div>
        <h2>Blog: &quot;{blog.title}&quot; by {blog.author}</h2>
        Url:{' '}<a href={blog.url}>{blog.url}</a><br />
        Total Likes: {blog.likes}{' '}
        <button onClick={() => handleLike(blog)}>Like</button>
        <br />
        <span>added by {blog.user.username}</span><br />
        <h4>Comments</h4>
        <form onSubmit={handleAddComment}>
          <input name="comment" />
          <button type="submit">Add Comment</button>
        </form>
        {blog.comments.length ?
          <ul>
            {blog.comments.map((x) =>
              // generate unique key
              <li key={x + Math.round(Math.random() * 100000)}>
                {x}
              </li>
            )}
          </ul>
          : <p>No comments found...</p>
        }
      </>
    )
  } else {
    return (
      <>
        <div className='navigationBar'>
          <b><Link to="/">Blogs</Link>{' '}<Link to='/users'>Users</Link></b>
        </div>
        <p>{id} is not a valid blog id</p>
      </>
    )
  }
}

export default SingleBlog