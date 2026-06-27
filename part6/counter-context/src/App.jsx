import { useState } from 'react'

import Panel from './components/Panel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <Navbar />
      <Panel counter={counter} setCounter={setCounter} />
      <Footer />
    </div>
  )
}

export default App
