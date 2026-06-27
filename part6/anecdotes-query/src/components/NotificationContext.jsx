import { createContext, useState, useRef } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState('')

  const timeoutRef = useRef()

  const sendNotification = (message) => {
    setNotification(message)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
