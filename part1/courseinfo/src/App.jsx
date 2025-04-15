const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.name} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((acc, value) => acc + value.exercises, 0)}
    </p>
  )
}

export default App
