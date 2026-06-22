import Buttons from './components/Buttons'
import Statistics from './components/Statistics'

const App = () => {
  return (
    <>
      <h1 className="w-full text-3xl bg-indigo-400 text-white p-4 mb-2">
        Unicafe
      </h1>
      <Buttons />
      <Statistics />
    </>
  )
}

export default App
