## part8
https://fullstackopen.com/en/part8

In this part we learned how to use [GraphQL](https://graphql.org/learn/), an alternative to REST to link the client to server, then implemented it in a library app using React with [ApolloClient](https://www.apollographql.com/docs/react/) for the frontend and [ApolloServer](https://www.apollographql.com/docs/apollo-server/) for the backend. Used the [Apollo Client Devtools](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm/related) to debug by inspecting queries, mutations and the cache. We later connected the backend to a MongoDB database to store data. 

The main advantage described when GraphQL is compared to REST is that requests to a REST API will often overfetch or underfetch (which requires additional requests) data which uses/consumes unnecessary resources of the client/server respectively which can decrease performance.

- library-backend
  - We first implemented the backend of our library app starting from [here](https://github.com/fullstack-hy2020/misc/blob/master/library-backend.js). We defined our schema, our types and the resolvers in ```library-backend/typeDefs.js``` and ```library-backend/resolvers.js```.
- library-frontend
  - Started our frontend from [here](https://github.com/fullstack-hy2020/library-frontend) and used ApolloClient to connect the React app to our GraphQL server. Implemented data fetching/data modifying using the React hooks useQuery and useMutation.

From here we revisited the backend to add users, the ability to log in and authorization using JWT covered in previous parts. Added the context initialization function to the ApolloServer constructor call and modified it to retrieve the token from the authorization header of the request, then find the user associated with the token using the database and place the user object in ```context.currentUser```. The context is accessible to the resolvers through their parameters which allows us to restrict access depending on who the user is.

After this, we modified the frontend to add the functionality matching these changes. This included:
  - Adding the ability to log in and store the token in local storage on success.
  - Adding a link to the Apollo link chain that sets the context of requests to include the token from the browser's local storage (if it exists) in the Authorization header.

We then implemented updating the cache manually by changing the update callbacks of the useMutation hooks, that runs when the mutation is completed, with the ```store.readQuery```, ```store.writeQuery``` and ```response.data``` methods. Briefly looked at the [n+1 selects](https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem-in-orm-object-relational-mapping) problem and how to solve using join queries.

Finally, we used [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to set up a subscription between the client and server that triggered a ```window.alert``` and updated the cache, ```updateCacheWith``` function in ```library-frontend/src/App.js```, when a new book was added to the server making sure not to double write to the cache if using the client to add the book.