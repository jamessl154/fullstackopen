import React from 'react'
import { CoursePart } from '../types'
import Part from './Part'

// destructure props: inline interface
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <>
            {courseParts.map(part =>
                <Part key={part.name} part={part} />
            )}
        </>
    )
}

export default Content