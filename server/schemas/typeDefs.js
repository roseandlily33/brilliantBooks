import {gql} from 'apollo-server-express';

export const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: ID!
        authors: [String]!
        description: String!
        title: String!
        image: String
        link: String

    }
    type Auth{
        token: ID!
        user: User

    }
    type BookInput {
        bookId: Int
        title: String!
        description: String!
        author: [String]
        link: String
        image: String

    }
    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }

    type Query{
        me: User
    }

`;

