import React from 'react'

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((x, y) => x + y.exercises, 0)
  return(
    <p><strong>Total of {sum} exercises</strong></p>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(x => 
        <Part key={x.id} part={x} />
      )}
    </div>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course