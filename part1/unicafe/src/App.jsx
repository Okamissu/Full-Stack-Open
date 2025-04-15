import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text="Good" setter={setGood} />
      <Button text="Neutral" setter={setNeutral} />
      <Button text="Bad" setter={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = ({ setter, text }) => (
  <button onClick={() => setter((prevValue) => prevValue + 1)}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral
  const average = total
    ? ((good * 1 + bad * -1 + neutral * 0) / total).toFixed(2)
    : 'N/A'
  const positive = total ? `${((good / total) * 100).toFixed(2)} %` : 'N/A'

  if (!total) return <p>No feedback given</p>

  return (
    <>
      <table>
        <caption>Statistics</caption>
        <tbody>
          <StatisticsLine text={'Good'} value={good} />
          <StatisticsLine text={'Neutral'} value={neutral} />
          <StatisticsLine text={'Bad'} value={bad} />
          <StatisticsLine text={'Total'} value={total} />
          <StatisticsLine text={'Average'} value={average} />
          <StatisticsLine text={'Positive'} value={positive} />
        </tbody>
      </table>
    </>
  )
}

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td className="td-value">{value}</td>
  </tr>
)

export default App
