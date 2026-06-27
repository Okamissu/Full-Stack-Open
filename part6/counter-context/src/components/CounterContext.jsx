import { createContext, useState } from 'react'

const CounterContext = createContext()

export default CounterContext

export const CounterContextProvider = (props) => {
  const [counter, setCounter] = useState(0)

  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  return (
    <CounterContext.Provider value={{ counter, increment, decrement, zero }}>
      {props.children}
    </CounterContext.Provider>
  )
}
