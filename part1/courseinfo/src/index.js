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
      {/** For exercise purpose, assume there is only 3 elements i.e. no loop */}

      <Part part={props.part[0].name}
        exercise={props.part[0].exercises}></Part>

      <Part part={props.part[1].name}
        exercise={props.part[1].exercises}></Part>

      <Part part={props.part[2].name}
        exercise={props.part[2].exercises}></Part>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercies {props.totalExs[0].exercises + props.totalExs[1].exercises + props.totalExs[2].exercises}
      </p>
      {/* <p>Number of exercises {props.totalExs}</p> */}
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <>
      <Header course={course}></Header>

      <Content part={parts}></Content>

      <Total totalExs={parts}></Total>
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
