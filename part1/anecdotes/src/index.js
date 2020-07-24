import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes, voteArray }) => {
  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(voteArray[0]) // init hook w/ empty array

  // chose random value 
  const randomize = (arraySize) => {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
    setSelected(getRandomInt(arraySize))
  }

  // increment vote
  const updateVoteCount = () => {
    const updateVote = [...voteCount]
    updateVote[selected]++
    setVoteCount(updateVote)
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {voteCount[selected]} votes</div>

      <button onClick={updateVoteCount}>vote</button>
      <button onClick={() => randomize(anecdotes.length)}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const voteArray = [
  Array
    .apply(null, new Array(anecdotes.length))
    .map(Number.prototype.valueOf, 0)
]


ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}
      voteArray={voteArray} />
  </React.StrictMode>,
  document.getElementById('root')
);