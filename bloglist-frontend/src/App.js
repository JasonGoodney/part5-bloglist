import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Sort from './components/Sort'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [sortBy, setSortBy] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({
    text: null,
    isError: false
  })
  const username = useField('text')
  const password = useField('password')
  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  // Get initial blogs
  useEffect(() => {
    blogsService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedJSONUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedJSONUser) {
      const user = JSON.parse(loggedJSONUser)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: titleField.value,
      author: authorField.value,
      url: urlField.value
    }

    try {
      const returnedBlog = await blogsService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      titleField.reset()
      authorField.reset()
      urlField.reset()
      displayNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
    } catch (exception) {
      displayNotification(`Error adding blog: ${exception}`, true)
    }
  }

  const handleBlogUpdate = async (blog, event) => {
    event.preventDefault()

    try {
      const updatedBlog = {
        ...blog,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      const returnedBlog = await blogsService.update(updatedBlog)
      setBlogs(blogs.map(b => (b.id !== blog.id ? b : returnedBlog)))
      console.log('returned', returnedBlog)
    } catch (exception) {
      displayNotification(`Failed to update blog: ${exception}`, true)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const handleBlogRemove = async (blog, event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const response = await blogsService.remove(blog.id)
        console.log('remove response', response)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception) {
        displayNotification(`Failed to remove blog: ${exception}`, true)
      }
    } else {
      console.log('remove not confirmed')
    }
  }

  const rows = () => {
    return (
      <Sort by={sortBy}>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            handleLikeClick={e => handleBlogUpdate(blog, e)}
            handleRemoveClick={e => handleBlogRemove(blog, e)}
            blog={blog}
            // isSelfPost={user ? blog.user.username === user.username : false}
          />
        ))}
      </Sort>
    )
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('handle login', username, password)
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      console.log(user)
      username.reset()
      password.reset()
      displayNotification(`Logged in as ${user.name}`)
    } catch (exception) {
      console.log(exception)
      displayNotification('wrong username or password', true)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const blogFormRef = React.createRef()
  const blogForm = () => {
    return (
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <div>
          <h2>create new</h2>
          <BlogForm
            onSubmit={addBlog}
            title={titleField}
            author={authorField}
            url={urlField}
          />
        </div>
      </Togglable>
    )
  }

  // Display notifications
  const displayNotification = (text, isError = false) => {
    setNotificationMessage({
      ...notificationMessage,
      text: text,
      isError: isError
    })

    runNotification()
  }
  const runNotification = () => {
    setTimeout(() => {
      setNotificationMessage({
        ...notificationMessage,
        text: null,
        isError: false
      })
    }, 5000)
  }

  const handleSort = event => {
    setSortBy(sortBy ? null : 'likes')
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <form onSubmit={handleLogout}>
            <p style={{ display: 'inline-block' }}>
              {user.name === null ? user.username : user.name} logged in
            </p>
            <button type='submit'>logout</button>
          </form>
          {blogForm()}
          <button onClick={handleSort}>
            {sortBy ? 'sort by default' : 'sort by likes'}
          </button>
          <div>{rows()}</div>
        </div>
      )}
    </div>
  )
}

export default App
