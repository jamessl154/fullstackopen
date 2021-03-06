require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const http = require('http')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const JWT_SECRET = process.env.SECRET_KEY

console.log('connecting to', process.env.MONGODB_URI)

// mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🚀 connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

// https://www.apollographql.com/docs/apollo-server/data/subscriptions

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/subscription" }
  );
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), 
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      },
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/'
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 GraphQL Server ready at http://localhost:4000`)
  console.log(`🚀 GraphQL Subscriptions ready at //localhost:4000/subscription`)
}

startApolloServer(typeDefs, resolvers)