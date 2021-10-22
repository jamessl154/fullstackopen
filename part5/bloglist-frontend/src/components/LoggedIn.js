import React from 'react'

const LoggedIn = ({ username, handleLogout }) => {
  return (
    <div className='navigationBar'>
      {username} is logged in {' '}
      <button onClick={handleLogout}>Logout</button>{' '}
    </div>
  )
}

export default LoggedIn