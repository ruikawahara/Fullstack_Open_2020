import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => <div>{text} {value}</div>

// not this delete later
const ShowRating = ({ good, neutral, bad, all }) => {
  if (all < 1)
    return (<div>No feedback given</div>)

  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      {/* <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div> */}
    </div>
  )
}

// change this
const Statistics = ({ goodRate, badRate, allRate }) => {
  if (allRate < 1)
    return (<div></div>)

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

      {/* Button Component */}
      <Button onClick={() => ratingUpdate("good")} text="good" />
      <Button onClick={() => ratingUpdate("neutral")} text="neutral" />
      <Button onClick={() => ratingUpdate("bad")} text="bad" />

      <h1>statistics</h1>
      <div>
        {/* Rating */}
        <ShowRating good={good} neutral={neutral} bad={bad} all={all} />

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