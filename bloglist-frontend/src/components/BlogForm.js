import React from 'react'
import Input from './Input'

const BlogForm = props => {
  const { onSubmit, onChange, title, author, url } = props

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            title: <Input {...title} />
          </div>
          <div>
            author: <Input {...author} />
          </div>
          <div>
            url: <Input {...url} />
          </div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
