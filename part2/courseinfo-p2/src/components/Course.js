const Header = ({name}) => (
    <h2>{name}</h2>
);

const Content = ({parts}) => (
    <div>
    {parts.map(part =>
	<p key={part.id}>{part.name} {part.exercises}</p>)}
    </div>
);

const Total = ({parts}) => (
    <b><p>Total {parts.reduce((total, part) => total + part.exercises, 0)} exercises</p></b>
);

const Course = ({course}) => {
    return (
	<div>
	  <Header name={course.name}/>
	  <Content parts={course.parts}/>
	  <Total parts={course.parts}/>
    </div>
    );
};

export default Course;
