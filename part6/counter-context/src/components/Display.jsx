import { useContext } from 'react'
import CounterContext from './CounterContext'

const displayStyle = {
  padding: '10px 20px',
  textAlign: 'center',
  fontSize: '2.5rem',
  marginTop: '20px',
}

const Display = () => {
  const { counter } = useContext(CounterContext)

  return <div style={displayStyle}>{counter}</div>
}

export default Display
