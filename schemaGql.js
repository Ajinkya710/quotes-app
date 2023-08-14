import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    user(_id: ID!): User
    quote(by: ID!): [Quote]
  }

  type User {
    _id: ID
    firstname: String
    lastname: String
    email: String
    quotes: [Quote]
  }

  type Quote {
    name: String
    by: ID
  }

  type Mutation {
    createUser(newUser:UserInput): User 
  }

  input UserInput {
    firstname:String!
    lastname:String!
    email:String!
    password:String!
  }
`;


export default typeDefs