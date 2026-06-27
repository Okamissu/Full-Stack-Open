import { useContext } from 'react'
import CounterContext from './CounterContext'

const controlsStyle = {
  padding: '10px 20px',
  textAlign: 'center',
  marginTop: '20px',
}

const Controls = () => {
  const { counter, setCounter } = useContext(CounterContext)
  
  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  return (
    <div style={controlsStyle}>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls
