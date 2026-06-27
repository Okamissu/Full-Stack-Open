import useCounter from '../hooks/useCounter'

const displayStyle = {
  padding: '10px 20px',
  textAlign: 'center',
  fontSize: '2.5rem',
  marginTop: '20px',
}

const Display = () => {
  const { counter } = useCounter()

  return <div style={displayStyle}>{counter}</div>
}

export default Display
