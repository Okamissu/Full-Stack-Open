const Total = ({ parts }) => {
  return (
    <p>
      <b>
        Total of {parts.reduce((acc, value) => acc + value.exercises, 0)}{' '}
        exercises
      </b>
    </p>
  )
}

export default Total
