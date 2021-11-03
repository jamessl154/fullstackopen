import React, { useEffect } from 'react'
import { ME, ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Recommended = ({ show, token }) => {
    const [meQuery, meQueryResult] = useLazyQuery(ME, {
        fetchPolicy: "network-only"
    })
    const [allBooksQuery, allBooksQueryResult] = useLazyQuery(ALL_BOOKS)

    // Once a token exists (logged in user) we can safely
    // send a query to find that user's favoriteGenre
    useEffect(() => {
        if (token) meQuery()
    }, [token]) // eslint-disable-line

    useEffect(() => {
        // short circuit logical AND, if data.me property doesn't exist yet it is ignored.
        // The property data.me persists when client.resetStore() is called but value is null
        // which causes this useEffect to run when like this: if (meQueryResult.data)
        if (meQueryResult.data && meQueryResult.data.me) {
            allBooksQuery({
                variables: { genre: meQueryResult.data.me.favoriteGenre }
            })
        }
    }, [meQueryResult.data]) // eslint-disable-line

    if (!show) return null

    let favGenre = meQueryResult.data.me.favoriteGenre
    let recommendedBooks = allBooksQueryResult.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>
            <p>These books are recommended to you because your 
            favorite genre is: <b>{favGenre}</b></p>
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                </tr>
                {recommendedBooks.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended