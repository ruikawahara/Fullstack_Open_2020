import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}


// now write with reduce
const Total = ({ parts }) => {

  const sum = parts
    .map(part => part.exercises)
    .reduce((s, p) => s + p, 0)

  return (
    <strong>
      <p>Total of {sum} exercises</p>
    </strong>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id}
          name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header key={course.id} name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))