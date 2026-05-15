const Notification = ({ notification }) => {
  if (notification === null) return null

  const notificationClass = `notification ${notification.type}`

  return <p className={notificationClass}>{notification.message}</p>
}

export default Notification
