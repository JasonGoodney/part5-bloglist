import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
jest.mock('./services/blogs')
import App from './App'
import LoginForm from './components/LoginForm'

const Wrapper = props => {
  const onUsernameChange = event => {
    props.state.username = event.target.value
  }

  const onPasswordChange = event => {
    props.state.password = event.target.value
  }

  return (
    <LoginForm
      onSubmit={props.onSubmit}
      handleUsernameChange={props.onUsernameChange}
      handlePasswordChange={props.onPasswordChange}
      username={props.state.username}
      password={props.state.password}
    />
  )
}

describe('<App />', () => {
  test('For logged out user, display login form and no blogs', async () => {
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(() => component.getByText('login'))

    expect(component.container).toHaveTextContent('login')
    expect(component.container).not.toHaveTextContent('new note')
  })

  test('when the user is logged in, the blog posts are rendered to the page', async () => {
    const onSubmit = jest.fn()
    const onUsernameChange = jest.fn()
    const onPasswordChange = jest.fn()
    const state = {
      username: '',
      password: ''
    }
    const component = render(
      <Wrapper
        onSubmit={onSubmit}
        state={state}
        onPasswordChange={onPasswordChange}
        onUsernameChange={onUsernameChange}
      />
    )

    component.rerender(<App />)

    const loginButton = component.getByText('login')
    fireEvent.click(loginButton)
  })
})
