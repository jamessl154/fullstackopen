import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const User = ({ users }) => {
  // conditionally render the component
  if (users) {
    const id = useParams().id
    let selectedUser = users.filter((x) => x.id === id)

    return (
      <>
        <Link to='/users'>Users</Link>{' '}<Link to="/">Blogs</Link>
        <h2>{selectedUser[0].username}</h2>
        <h3>Blogs added</h3>
        <ul>
          {selectedUser[0].blogs.map(x =>
            <li key={x.id}>
              {x.title}
            </li>
          )}
        </ul>
      </>
    )
  }
  else return null
}

export default User