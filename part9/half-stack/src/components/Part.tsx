import React from 'react'
import { CoursePart } from '../types'

const Part = ({ part }: { part: CoursePart }) => {

    // https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking
    // exhaustive switch check prevent undefined return type
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union memebr: ${JSON.stringify(value)}`
        );
    };

    switch(part.type) {
            case "normal":
                return (
                    <>
                        <h3>{part.name}</h3>
                        <ul>
                            <li><b>Exercise Count:</b> {part.exerciseCount}</li>
                            <li><b>Description: </b>{part.description}</li>
                            <li><b>Type: </b>{part.type}</li>
                        </ul>
                    </>
                )
            case "groupProject":
                return (
                    <>
                        <h3>{part.name}</h3>
                        <ul>
                            <li><b>Exercise Count:</b> {part.exerciseCount}</li>
                            <li><b>Group Project Count: </b>{part.groupProjectCount}</li>
                            <li><b>Type: </b>{part.type}</li>
                        </ul>
                    </>
                )
            case "submission":
                return (
                    <>
                        <h3>{part.name}</h3>
                        <ul>
                            <li><b>Exercise Count:</b> {part.exerciseCount}</li>
                            <li><b>Submission Link: </b>{part.exerciseSubmissionLink}</li>
                            <li><b>Type: </b>{part.type}</li>
                        </ul>
                    </>
                )
            default:
                return assertNever(part)
    }
}

export default Part