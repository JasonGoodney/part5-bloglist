import { useState } from 'react'
import axios from 'axios'

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    const request = axios.get(baseUrl)
    request.then(response => {
      setResources(resources.concat(response.data))
    })
  }

  const create = async resource => {
    const request = await axios.post(baseUrl, resource)
    setResources(resources.concat(request.data))
  }

  const service = {
    create,
    getAll
  }

  return [resources, service]
}
