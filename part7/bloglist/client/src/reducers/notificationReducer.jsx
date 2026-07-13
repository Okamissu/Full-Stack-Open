const notifications = {
  wrong_credentials: {
    type: 'error',
    message: 'Wrong credentials',
  },
  log_out: {
    type: 'info',
    message: 'Logged out',
  },
  add_info: {
    type: 'info',
    message: 'Blog added',
  },
  add_error: {
    type: 'error',
    message: 'Missing or incorrect blog data',
  },
  remove_error: {
    type: 'error',
    message: "Couldn't remove the blog",
  },
  like_error: {
    type: 'error',
    message: "Couldn't handle the like request",
  },
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'reset_notification':
      return null

    case 'remove_info':
      return {
        type: 'info',
        message: `Removed blog: ${action.title} by ${action.author}`,
      }

    default:
      return notifications[action.type] || state
  }
}

export default notificationReducer
