# GraphQL in Node.js with Express - A Complete Guide

## Introduction to GraphQL
GraphQL is a query language for APIs that provides a more flexible and efficient way to fetch and manipulate data compared to REST. It allows clients to request only the data they need, reducing over-fetching and under-fetching of data.

## Setting Up GraphQL with Express in Node.js
To use GraphQL in a Node.js application with Express, you typically use the `express`, `express-graphql`, and `graphql` packages.

### Installation
```sh
npm init -y
npm install express express-graphql graphql cors body-parser
```

## Creating a GraphQL Server with Express
### 1. Define Schema
GraphQL schemas define the structure of queries, mutations, and types. 

#### **schema.js**
```js
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`);

module.exports = schema;
```

### 2. Define Resolvers
Resolvers handle how each GraphQL query/mutation retrieves or modifies data.

#### **resolvers.js**
```js
const books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "Brave New World", author: "Aldous Huxley" }
];

const root = {
  books: () => books,
  book: ({ id }) => books.find(book => book.id === id),
  addBook: ({ title, author }) => {
    if (!title || !author) {
      throw new Error("Title and author are required fields");
    }
    const newBook = { id: String(books.length + 1), title, author };
    books.push(newBook);
    return newBook;
  }
};

module.exports = root;
```

### 3. Setup Express with GraphQL Middleware
#### **server.js**
```js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const root = require('./resolvers');
const cors = require('cors');

const app = express();
app.use(cors());

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  customFormatErrorFn: (err) => ({
    message: err.message,
    code: err.originalError && err.originalError.code ? err.originalError.code : 500
  })
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});
```

## Running the GraphQL Server
```sh
node server.js
```
Server starts at: `http://localhost:4000/graphql`

## Calling GraphQL from Postman
1. Open **Postman**
2. Set method to **POST**
3. URL: `http://localhost:4000/graphql`
4. Headers:
   - `Content-Type: application/json`
5. Body (raw JSON):

### **Queries**
#### Fetch All Books
```json
{
  "query": "{ books { id title author } }"
}
```
#### Fetch Book by ID
```json
{
  "query": "{ book(id: \"1\") { title author } }"
}
```

### **Mutations**
#### Add a Book
```json
{
  "query": "mutation { addBook(title: \"The Great Gatsby\", author: \"F. Scott Fitzgerald\") { id title author } }"
}
```

## Advanced Features
### **Error Handling**
- Added error handling for missing required fields in `addBook`
- Implemented global error handling middleware in Express
- Customized GraphQL error formatting using `customFormatErrorFn`

### **Subscriptions (Real-time Updates)**
GraphQL subscriptions require WebSockets. To enable subscriptions, install WebSockets support:
```sh
npm install ws
```
Then, configure WebSocket handling separately.

---
