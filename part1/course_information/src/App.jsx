import { Component } from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };

  const Header = (props) => {
    console.log(props);
    return <h1>{props.course}</h1>;
  };

  const Content = (props) => {
    return (
      <>
        <Part title={props.parts[0].name} exercise={props.parts[0].exercises} />
        <Part title={props.parts[1].name} exercise={props.parts[1].exercises} />
        <Part title={props.parts[2].name} exercise={props.parts[2].exercises} />
      </>
    );
  };

  const Part = (props) => {
    return (
      <p>
        {props.title} {props.exercise}
      </p>
    );
  };

  const Total = (props) => {
    return (
      <p>
        Number of exercises
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;