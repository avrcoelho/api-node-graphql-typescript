import { ApolloServer } from 'apollo-server';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import mongoose from 'mongoose';

const startServer = ({ typeDefs, resolvers }: ApolloServerExpressConfig) => {
  mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => console.log(`🚀 Server started at ${url}`));
};

export default startServer;
