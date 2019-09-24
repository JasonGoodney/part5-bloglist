import axios from 'axios'
import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = baseUrl => {
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token }
    }

    const request = await axios.post(baseUrl, newObject, config)
    return request.data
  }

  const update = async newObject => {
    const config = {
      headers: { Authorization: token }
    }

    const request = await axios.put(
      `${baseUrl}/${newObject.id}`,
      newObject,
      config
    )
    return request.data
  }

  const remove = async id => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    console.log(response)
    return response
  }

  return { getAll, create, update, remove, setToken }
}
