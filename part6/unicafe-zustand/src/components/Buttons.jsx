import { useRatingStore } from '../useRatingStore'

const Buttons = () => {
  const { incrementGood, incrementBad, incrementNeutral } = useRatingStore(
    (state) => state.actions,
  )

  return (
    <div className="flex flex-wrap justify-center p-4 gap-2">
      <h2 className="text-2xl my-2 basis-full text-center">Give feedback</h2>
      <button onClick={incrementGood} className="bg-green-400">
        Good
      </button>
      <button onClick={incrementNeutral} className="bg-blue-300">
        Neutral
      </button>
      <button onClick={incrementBad} className="bg-red-400">
        Bad
      </button>
    </div>
  )
}

export default Buttons
