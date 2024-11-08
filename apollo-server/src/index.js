import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import { resolvers } from './resolvers.js';
import { typeDefs } from './models/typeDefs.js';

mongoose.set('strictQuery', true);
const db = await mongoose.connect("mongodb://127.0.0.1:27017/my-app-database", {
    useNewUrlParser: true, useUnifiedTopology: true
});
console.info('📚 Connected to db', db?.connections[0]?._connectionString);


const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4004 },

});

console.info(`🚀 Server ready at ${url}`);