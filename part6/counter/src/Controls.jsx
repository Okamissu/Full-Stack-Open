import { useCounterControls } from './store'

const Controls = () => {
  const { decrement, zero, increment } = useCounterControls(
    (state) => state.actions,
  )

  return (
    <div className="flex items-center justify-center">
      <button
        className="px-2 py-2 mx-1 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={decrement}
      >
        minus
      </button>
      <button
        className="px-2 py-2 mx-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={zero}
      >
        zero
      </button>

      <button
        className="px-2 py-2 mx-1 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={increment}
      >
        plus
      </button>
    </div>
  )
}

export default Controls
