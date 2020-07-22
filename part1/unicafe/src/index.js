import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // what happens when clicked
  const goodButton = () => setGood(good + 1)
  const neutralButton = () => setNeutral(neutral + 1)
  const badButton = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodButton}>good</button>
      <button onClick={neutralButton}>neutral</button>
      <button onClick={badButton}>bad</button>

      <h1>statistics</h1>
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
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