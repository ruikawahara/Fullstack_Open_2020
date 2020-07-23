import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ goodRate, neutralRate, badRate, allRate }) => {
  if (allRate < 1)
    return (<div>No feedback given</div>)

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={goodRate} />
          <Statistic text="neutral" value={neutralRate} />
          <Statistic text="bad" value={badRate} />
          <tr>
            <td>all</td>
            <td>{allRate}</td>
          </tr>

          <tr>
            <td>average</td>
            <td>{(goodRate - badRate) / allRate}</td>
          </tr>

          <tr>
            <td>positive</td>
            <td>{(goodRate / allRate) * 100}%</td>
          </tr>
        </tbody>
      </table>
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
        {/* Display Result */}
        <Statistics goodRate={good} neutralRate={neutral} badRate={bad} allRate={all} />
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