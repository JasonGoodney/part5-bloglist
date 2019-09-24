import React from 'react'

const Input = ({ value, type, onChange, reset }) => {
  return (
    <>
      <input value={value} type={type} onChange={onChange} />
    </>
  )
}

export default Input
