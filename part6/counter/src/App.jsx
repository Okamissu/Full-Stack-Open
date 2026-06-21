import { create } from 'zustand'

const useCounterStore = create((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
}))

const App = () => {
  const counter = useCounterStore((state) => state.counter)
  const increment = useCounterStore((state) => state.increment)

  return (
    <div>
      <div>{counter}</div>
      <div>
        <button onClick={increment}>plus</button>
        <button>minus</button>
        <button>zero</button>
      </div>
    </div>
  )
}

export default App
