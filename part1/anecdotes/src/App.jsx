import { useState } from 'react'

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 1,
    1: 3,
    2: 4,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
  })

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const setSelectedRandomly = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteSelected = () =>
    setVotes((prevVotes) => {
      return { ...prevVotes, [selected]: prevVotes[selected] + 1 }
    })

  const getMostVotedAnecdoteIndex = () => {
    const mostVotedIndex = Object.entries(votes).reduce(
      (maxIndex, [currIndex, currVotes]) =>
        currVotes > votes[maxIndex] ? +currIndex : maxIndex,
      0
    )

    return mostVotedIndex
  }

  const mostVotedIndex = getMostVotedAnecdoteIndex()

  return (
    <>
      <Anecdote
        title={'Anecdote of the day'}
        text={anecdotes[selected]}
        votes={votes[selected]}
      />
      <button onClick={setSelectedRandomly}>next anecdote</button>
      <button onClick={voteSelected}>vote</button>
      <Anecdote
        title={'Anecdote with most votes'}
        text={anecdotes[mostVotedIndex]}
        votes={votes[mostVotedIndex]}
      />
    </>
  )
}

const Anecdote = ({ title, text, votes }) => (
  <>
    <h1>{title}</h1>
    <p>{text}</p>
    <p>
      has {votes} {votes === 1 ? 'vote' : 'votes'}
    </p>
  </>
)

export default App
