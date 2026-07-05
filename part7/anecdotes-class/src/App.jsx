import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    anecdotes: [],
    current: 0,
  }

  componentDidMount() {
    fetch('http://localhost:3000/anecdotes')
      .then((response) => response.json())
      .then((data) => this.setState({ anecdotes: data }))
  }

  handleClick = () => {
    const randId = Math.floor(Math.random() * this.state.anecdotes.length)

    this.setState({ current: randId })
  }

  render() {
    const { anecdotes, current } = this.state

    if (this.state.anecdotes.length === 0) {
      return <p>No anecdotes...</p>
    }

    return (
      <div>
        <h1>Anecdote of the day: #{anecdotes[current].id}</h1>
        <p>{anecdotes[current].content}</p>
        <p>Votes: {anecdotes[current].votes}</p>
        <button onClick={this.handleClick}>Another one</button>
      </div>
    )
  }
}

export default App
