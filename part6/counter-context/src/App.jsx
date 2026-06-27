import { useState } from 'react'

import Panel from './components/Panel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CounterContext from './components/CounterContext'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      <Navbar />
      <Panel />
      <Footer />
    </CounterContext.Provider>
  )
}

export default App
