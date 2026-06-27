import { useContext } from 'react'
import CounterContext from '../components/CounterContext'

const useCounter = () => useContext(CounterContext)

export default useCounter
