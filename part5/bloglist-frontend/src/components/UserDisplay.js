import React from 'react'
import { Link } from 'react-router-dom'

const UserDisplay = (props) => {
  // UserDisplay, like Blog, is a presentational component
  // so we want to exclude state management, pass users as a prop
  return (
    <>
      <div className='pageTitle'>Users</div>
      {props.users
        ?
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Blogs added</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map(x =>
              <tr key={x.id}>
                <td><Link to={`/users/${x.id}`}>{x.username}</Link></td>
                <td>{x.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
        :
        null
      }
    </>
  )
}

export default UserDisplay