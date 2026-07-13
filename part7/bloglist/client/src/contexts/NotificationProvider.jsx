import { useEffect, useReducer } from 'react'
import NotificationContext from './NotificationContext'
import notificationReducer from '../reducers/notificationReducer'

const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  useEffect(() => {
    if (!notification) return

    const timer = setTimeout(() => {
      dispatch({ type: 'reset_notification' })
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification])

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
