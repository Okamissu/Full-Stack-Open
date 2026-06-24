import { useNotification } from '../store'

const Notification = () => {
  const notification = useNotification()

  return (
    <div
      className={`bg-blue-100 inset-x-0 mx-auto  py-2 px-4 rounded-lg border border-blue-200 shadow-sm fixed text-blue-900 pointer-events-none w-fit max-w-2xl
        transition-all duration-300 ease-in-out ${notification.message ? 'bottom-2 opacity-95' : '-bottom-20 opacity-0'}`}
    >
      {notification.message}
    </div>
  )
}

export default Notification
