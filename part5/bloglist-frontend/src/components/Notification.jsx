import { NotificationBox } from '../styles'

const Notification = ({ notification }) => {
  if (!notification) return null

  return (
    <NotificationBox $error={notification.type === 'error'}>
      {notification.message}
    </NotificationBox>
  )
}

export default Notification
