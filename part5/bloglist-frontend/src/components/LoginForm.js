import React from 'react'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({ username, password, handleLogin,
  setPassword, setUsername }) => {

  return (
    <div>
      <h1>
        Welcome!
      </h1>
      <form data-cy='loginForm' onSubmit={handleLogin}>
        <div>
          <TextField
            variant="standard"
            id='username'
            label='Username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <TextField
            variant="standard"
            id='password'
            label='Password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <br />
        <Button color='primary' size='large' data-cy='loginButton' type="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm