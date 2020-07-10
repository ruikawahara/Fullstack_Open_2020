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
        <Part part="Fundamentals of React" exercise="10"></Part>
        <Part part="Using props to pass data" exercise="7"></Part>
        <Part part="State of a component" exercise="14"></Part>
      </p>
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
      <p>Number of exercises {props.totalExs}</p>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Header course="Half Stack application development"></Header>

      <Content></Content>

      <Total totalExs={10 + 7 + 14}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
