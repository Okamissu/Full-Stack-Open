import { useCounter } from './store'

const Display = () => {
  const counter = useCounter((state) => state.counter)

  return <div className="text-center text-4xl p-4 ">{counter}</div>
}

export default Display
