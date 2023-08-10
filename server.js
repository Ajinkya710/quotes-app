import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";

const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    user(id:ID!) : User
    quote(by:ID!) : [Quote]
  }

  type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    quotes: [Quote]
  }

  type Quote {
    name: String
    by: ID
  }
`;

const resolvers = {
  Query: {
    users: () => {return users},
    quotes: () => {return quotes},
    user: (_,{id}) => users.find((user) => user.id === id),
    quote: (_,{by}) => quotes.filter((quote) => quote.by === by)
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`);
});
