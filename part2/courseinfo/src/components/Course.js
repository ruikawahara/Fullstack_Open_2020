import React from 'react'

const Header = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Total = ({ parts }) => {

    const sum = parts
        .map(part => part.exercises)
        .reduce((s, p) => s + p, 0)

    return (
        <strong>
            <p>Total of {sum} exercises</p>
        </strong>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id}
                    name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course =>
                <Header key={course.id} course={course} />
            )}
        </div>
    )
}

export default Course