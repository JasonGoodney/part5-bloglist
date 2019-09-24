import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

const LoginForm = ({ onSubmit, username, password }) => {
  return (
    <div>
      <h2 className='loginHeader'>log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
          <Input className='usernameInput' {...username} />
        </div>
        <div>
          password
          <Input className='passwordInput' {...password} />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
