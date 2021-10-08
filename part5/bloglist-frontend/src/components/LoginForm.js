import React from 'react'

const LoginForm = ({ username, password, handleLogin,
  setPassword, setUsername }) => {

  return (
    <div>
      <h2>Log in to the Application</h2>
      <form data-cy='loginForm' onSubmit={handleLogin}>
        <div className='container'>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <button data-cy='loginButton' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm