import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
    split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

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

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/subscription',
    options: {
      reconnect: true
    }
});

// https://www.apollographql.com/docs/react/data/subscriptions/#3-split-communication-by-operation-recommended

// WebSocket for subscription, HTTP for queries and mutations
// queries/mutations dont need long-lasting connection
// split combines the 2 links and uses either WebSocketLink or HttpLink
// depending on the operation
const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

ReactDOM.render(
    // wrap all components so they have access to the client
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)