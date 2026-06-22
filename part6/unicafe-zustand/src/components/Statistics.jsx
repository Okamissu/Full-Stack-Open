import { useRatingStore } from '../useRatingStore'

const Statistics = () => {
  const good = useRatingStore((state) => state.good)
  const neutral = useRatingStore((state) => state.neutral)
  const bad = useRatingStore((state) => state.bad)
  const all = good + neutral + bad
  const average = all ? (good - bad) / all : 0
  const positive = all ? (good / all) * 100 : 0

  return (
    <div className="mt-6 rounded-lg border border-indigo-200 p-6 shadow-md w-fit mx-auto bg-indigo-50">
      <h2 className="mb-4 text-2xl">Statistics</h2>
      <table className="border-separate border-spacing-y-1">
        {all ? (
          <tbody>
            <tr>
              <td className="stat-label">Good</td>
              <td className="stat-value">{good}</td>
            </tr>
            <tr>
              <td className="stat-label">Neutral</td>
              <td className="stat-value">{neutral}</td>
            </tr>
            <tr>
              <td className="stat-label">Bad</td>
              <td className="stat-value">{bad}</td>
            </tr>
            <tr>
              <td className="stat-label">All</td>
              <td className="stat-value">{all}</td>
            </tr>
            <tr>
              <td className="stat-label">Average</td>
              <td className="stat-value">{average.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="stat-label">Positive</td>
              <td className="stat-value">{positive.toFixed(2)}%</td>
            </tr>
          </tbody>
        ) : (
          <p>No feedback given</p>
        )}
      </table>
    </div>
  )
}

export default Statistics
