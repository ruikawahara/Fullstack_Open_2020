import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ goodRate, badRate, allRate }) => {
  if (allRate < 1) {
    return (
      <div>
        <div>all {allRate}</div>
        <div>average 0</div>
        <div>positive 0%</div>
      </div>
    )
  }

  return (
    <div>
      <div>all {allRate}</div>
      <div>average {(goodRate - badRate) / allRate}</div>
      <div>positive {(goodRate / allRate) * 100}%</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // accumulated result
  const [all, setAll] = useState(0)

  // what happens when clicked
  const ratingUpdate = (rate) => {
    setAll(all + 1)

    if (rate === "good")
      return setGood(good + 1)
    else if (rate === "neutral")
      return setNeutral(neutral + 1)
    else if (rate === "bad")
      return setBad(bad + 1)
    else {
      // safety net
      console.log("Invalid Rating")
      setAll(all)
      return
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => ratingUpdate("good")}>good</button>
      <button onClick={() => ratingUpdate("neutral")}>neutral</button>
      <button onClick={() => ratingUpdate("bad")}>bad</button>

      <h1>statistics</h1>
      <div>
        {/* Rating */}
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>

        {/* Accumulation */}
        <Statistics goodRate={good} badRate={bad} allRate={all} />

      </div>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);