import { NotificationBox } from '../styles'
import useNotification from '../hooks/useNotification'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) return null

  return (
    <NotificationBox $error={notification.type === 'error'}>
      {notification.message}
    </NotificationBox>
  )
}

export default Notification
