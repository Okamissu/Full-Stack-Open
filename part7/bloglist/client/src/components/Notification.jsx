import { NotificationBox } from '../styles'
import {
  useNotification,
  useNotificationActions,
} from '../hooks/useNotification'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useNotification()
  const { resetNotification } = useNotificationActions()

  useEffect(() => {
    if (!notification.type && !notification.message) return

    const timeout = setTimeout(() => {
      resetNotification()
    }, 5000)

    return () => clearTimeout(timeout)
  }, [notification, resetNotification])

  if (!notification.type && !notification.message) return null

  return (
    <NotificationBox $error={notification.type === 'error'}>
      {notification.message}
    </NotificationBox>
  )
}

export default Notification
