const Course = ({course}) => {

  const Header = (props) => {
    console.log(props);
    return <h1>{props.course}</h1>;
  };

  const Content = (props) => {
    console.log(props);
    return (
      <>
      {console.log(props.parts)}
      {props.parts.map(part =>(<Part key={part.id} title={part.name} exercise={part.exercises} />))}
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
        <strong>Total of {props.parts.reduce((sum, part) => {return sum + part.exercises}, 0)} exercises</strong>
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

export default Course;

