import React from 'react'

const compare = (a, b) => {
  return b.props.blog.likes - a.props.blog.likes
}

const Sort = ({ children, by }) => {
  if (!by) {
    return children
  }
  return React.Children.toArray(children).sort(compare)
}

export default Sort

/// https://stackoverflow.com/users/1275105/user1275105
/// https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties
