import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {/** For exercise purpose, assume there is only 3 elements i.e. no loop */}


      <Part part={props.part.course[0].name}
        exercise={props.part.course[0].exercises}></Part>

      <Part part={props.part.course[1].name}
        exercise={props.part.course[1].exercises}></Part>

      <Part part={props.part.course[2].name}
        exercise={props.part.course[2].exercises}></Part>
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
        Number of exercies {props.totalExs.course[0].exercises + props.totalExs.course[1].exercises + props.totalExs.course[2].exercises}
      </p>
    </>
  );
};

const App = () => {

  const course = {
    name: 'Half Stack application development',
    course: [
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
      }
    ]
  }

  return (
    <>
      <Header course={course}></Header>

      <Content part={course}></Content>

      <Total totalExs={course}></Total>
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
