import '@testing-library/jest-dom/extend-expect'

const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
}

localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
