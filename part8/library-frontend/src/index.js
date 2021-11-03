import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// https://www.apollographql.com/docs/react/api/link/introduction/
// Links in a chain (array)
// Each link should represent either a self-contained modification
// to a GraphQL operation or a side effect (such as logging).
const authLink = setContext((_, { headers }) => {
    // https://www.apollographql.com/docs/react/networking/authentication/#header
    const token = localStorage.getItem('library-user-token')

    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      }
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

ReactDOM.render(
    // wrap all components so they have access to the client
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)