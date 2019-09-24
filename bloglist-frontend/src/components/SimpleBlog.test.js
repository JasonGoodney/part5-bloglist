import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let blog = {
    title: 'title',
    author: 'author',
    likes: 8
  }
  const onClick = () => {
    blog = { ...blog, likes: blog.likes + 1 }
  }

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={onClick}>
        <div className='testDiv' />
      </SimpleBlog>
    )
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('blog info is rendered', () => {
    const div = component.container.querySelector('.blogInfo')
    expect(div).toHaveTextContent('title author')
  })

  test('blog info is rendered', () => {
    const div = component.container.querySelector('.blogLikes')
    expect(div).toHaveTextContent(`blog has ${blog.likes} likes`)
  })

  test('after clicking the button, likes are increased by one', () => {
    const likesBefore = blog.likes

    const button = component.getByText('like')
    fireEvent.click(button)

    const likesAfter = blog.likes

    expect(likesAfter).toEqual(likesBefore + 1)
  })

  test('after clicking the button twice, onClick prop is called twice', () => {
    const likesBefore = blog.likes

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    const likesAfter = blog.likes

    expect(likesAfter).toEqual(likesBefore + 2)
  })
})
