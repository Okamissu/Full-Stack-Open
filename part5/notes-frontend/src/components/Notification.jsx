const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className="error" role="alert">
      {message}
    </div>
  )
}

export default Notification
