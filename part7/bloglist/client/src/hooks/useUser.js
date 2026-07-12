import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    setUser: (user) => {
      set(() => ({
        user,
      }))
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
