const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Users', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));

// Schéma GraphQL
const schema = buildSchema(`
  type Query {
    user(id: ID!): User
    users: [User]
    usersByName(name: String!): [User]
    post(id: ID!): Post
    posts: [Post]
  }

  type Mutation {
    addPost(
      title: String!, 
      content: String!, 
      authorId: ID!
    ): Post
    deletePost(
        id: ID!
    ):Post
    updatePost(
        id: ID!
        title: String,
        content: String
        authorId: ID
    ):Post
  }

  type User {
    id: ID!
    name: String
    email: String
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }
`);

 // Données simulées
const users = [
  { id: "0", name: 'Alice', email: 'alice@example.com' },
  { id: "1", name: 'Bob', email: 'bob@example.com' }
];

const posts = [
  { id: "0", title: 'Alice', content: 'contenu pour alice', author: "0" },
  { id: "1", title: 'Bob', content: 'contenu de Bob', author: "1"}
]; 

// Résolveurs

const root = {
  user: ({ id }) => {
    const user = users.find(user => user.id === id);
    if (user) {
      user.posts = posts.filter(post => post.author === user.id);
    }
    return user;
  },

 users: () => {
    return users.map(user => {
        return {
            ... user,
        }
    })
  },

  usersByName: ({ name }) => {
    return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  },

  post: ({ id }) => {
    const post = posts.find(post => post.id === id);
    if (post) {
      post.author = users.find(user => user.id === post.author);
    }
    return post;
  },

  posts: () => {
    return posts.map(post => {
      return {
        ...post,
        author: users.find(user => user.id === post.author)
      };
    });
  },

  addPost: ({ title, content, authorId }) => {
    const newPost = { id: String(posts.length + 1), title, content, author: authorId };
    posts.push(newPost);
    return newPost;
  },

  deletePost: ({ id }) => {
    const deletePost = posts.filter(post => post.id !== id);
    return deletePost;
  },

  updatePost: ({id, title, content, authorId}) => {
    const updatePost = {id: posts.find(post => post.id === id), title, content, authorId};
    posts.push(updatePost);
    console.log(updatePost); 
    return updatePost;
  }
};

// Création du serveur Express
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Lancement du serveur
app.listen(4000, () => console.log('Serveur GraphQL lancé sur http://localhost:4000/graphql'));