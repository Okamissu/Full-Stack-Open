import { create } from 'zustand'

const useCounterStore = create((set) => ({
  counter: 0,
  actions: {
    increment: () => set((state) => ({ counter: state.counter + 1 })),
    decrement: () => set((state) => ({ counter: state.counter - 1 })),
    zero: () => set(() => ({ counter: 0 })),
  },
}))

export const useCounter = () => useCounterStore((state) => state.counter)
export const useCounterControls = () =>
  useCounterStore((state) => state.actions)

export default useCounterStore
