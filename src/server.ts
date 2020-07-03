import { ApolloServer, PubSub } from 'apollo-server';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import mongoose from 'mongoose';

const startServer = ({ typeDefs, resolvers }: ApolloServerExpressConfig) => {
  mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // responsavel por pegar informações do backend e enviar via socket para os clientes
  const pubsub = new PubSub();
  const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });

  server.listen().then(({ url }) => console.log(`🚀 Server started at ${url}`));
};

export default startServer;
