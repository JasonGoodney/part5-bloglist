import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'title',
    author: 'author',
    url: 'url.com',
    likes: 9
  }

  const handleLikeClick = () => {
    console.log('like click')
  }

  const handeRemoveClick = () => {
    console.log('remove click')
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLikeClick={handleLikeClick}
        handleRemoveClick={handeRemoveClick}>
        <div className='testDiv' />
      </Blog>
    )
  })

  test('at start the child are not displayed', () => {
    const blogHidden = component.container.querySelector('.blogHidden')
    expect(blogHidden).toBeVisible()
    const blogVisible = component.container.querySelector('.blogVisible')
    expect(blogVisible).toBeNull()
  })

  test('after title is clicked, url and likes are displayed', () => {
    const button = component.container.querySelector('.clickable')

    fireEvent.click(button)
    const blogVisible = component.container.querySelector('.blogVisible')
    expect(blogVisible).toBeVisible()
  })
})
