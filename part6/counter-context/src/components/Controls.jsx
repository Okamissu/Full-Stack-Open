import useCounter from '../hooks/useCounter'

const controlsStyle = {
  padding: '10px 20px',
  textAlign: 'center',
  marginTop: '20px',
}

const Controls = () => {
  const { increment, decrement, zero } = useCounter()

  return (
    <div style={controlsStyle}>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls
