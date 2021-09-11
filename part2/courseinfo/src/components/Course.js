import React from 'react'

// Destructured into name from the prop course.name from Course
const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {
  // Total receives 1 prop from the component Course
  // named parts which contains course.parts. We destructure it into the array of objects called parts.
  // Iterate over the parts array of objects. Starting from 0, sum that and the next
  // object's exercises property until the array is empty.
  // return the sum to be rendered on the page
  const sum = parts.reduce((x, y) => x + y.exercises, 0)
  return(
    <p><strong>Total of {sum} exercises</strong></p>
  ) 
}

// Destructured part prop into a part variable where it is a single object
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {/*
        Create a new component for each object in 
        course.parts array and pass that object as a prop to the new Part component
        while creating a key using its id
      */}
      {parts.map(x => 
        <Part key={x.id} part={x} />
      )}
    </div>
  )
}

// The prop destrucured into the course variable is either the node.js
// course object or the half stack application development course object
const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course