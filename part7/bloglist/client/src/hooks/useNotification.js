import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: {
    type: null,
    message: null,
  },
  actions: {
    setNotification: (type, message) =>
      set(() => ({ notification: { type, message } })),
    resetNotification: () =>
      set(() => ({
        notification: {
          type: null,
          message: null,
        },
      })),
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.notification)

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)
