const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default userReducer
