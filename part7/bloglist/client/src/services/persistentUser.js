const STORAGE_KEY = 'loggedBlogAppUser'

const getUser = () => {
  const userJSON = window.localStorage.getItem(STORAGE_KEY)
  return userJSON ? JSON.parse(userJSON) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}

export default {
  getUser,
  saveUser,
  removeUser,
}
