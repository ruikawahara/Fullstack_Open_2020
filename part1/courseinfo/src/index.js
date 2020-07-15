import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
        {/* <Part part="Fundamentals of React" exercise="10"></Part>
        <Part part="Using props to pass data" exercise="7"></Part>
        <Part part="State of a component" exercise="14"></Part> */}
      </p>
    </>
  );
};

/*
const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};
*/

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.totalExs}</p>
    </>
  );
};

// part 1.3+
const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <>
      <Header course={course}></Header>

      <Content part={part1.name} exercise={part1.exercises}></Content>
      <Content part={part2.name} exercise={part2.exercises}></Content>
      <Content part={part3.name} exercise={part3.exercises}></Content>

      <Total
        totalExs={part1.exercises + part2.exercises + part3.exercises}
      ></Total>
    </>
  );
};

/*
// part 1.1-1.2
const App = () => {
  return (
    <div>
      <Header course="Half Stack application development"></Header>

      <Content></Content>

      <Total totalExs={10 + 7 + 14}></Total>
    </div>
  );
};
*/

ReactDOM.render(<App />, document.getElementById("root"));
