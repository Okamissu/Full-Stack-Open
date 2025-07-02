const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((acc, value) => acc + value.exercises, 0)}
    </p>
  )
}

export default Total
