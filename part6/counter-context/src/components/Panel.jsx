import Display from './Display'
import Controls from './Controls'

const Panel = ({ counter, setCounter }) => {
  return (
    <div>
      <Display counter={counter} />
      <Controls counter={counter} setCounter={setCounter} />
    </div>
  )
}

export default Panel
