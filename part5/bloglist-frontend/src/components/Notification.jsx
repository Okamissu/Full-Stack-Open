import { NotificationBox } from '../styles'

const Notification = ({ notification }) => {
  if (!notification) return null

  const isError = notification.type === 'error'

  return (
    <NotificationBox error={isError}>{notification.message}</NotificationBox>
  )
}

export default Notification
