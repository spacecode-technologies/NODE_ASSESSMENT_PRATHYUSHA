var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  input PostInput {
    name: String
    email: String
    password: String
  }
  type Post {
    id: ID!
    name: String
    email: String
    password: String
  }
  type Query {
    getPost(id: ID!): Post
    getPosts: [Post]
  }
  type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): String
  }
`);

class Post {
  constructor(id, {name, email, password}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

var database = {};

var root = {
  getPost: ({ id }) => {
    if(!database[id]) {
      throw new Error(`No post with id ${id}`);
    }

    return new Post(id, database[id]);
  },
  getPosts: () => {
    var posts = [];
    for (var id in database) {
      if(database.hasOwnProperty(id)) {
        var post = database[id];
        posts.push(new Post(id, post));
      }
    }

    return posts;
  },
  createPost: ({input}) => {
    var id = require('crypto').randomBytes(10).toString('hex');
    database[id] = input;
    return new Post(id, input);
  },
  updatePost: ({id, input}) => {
    if(!database[id]) {
      throw new Error(`No post with id ${id}`);
    }
    database[id] = input;
    return new Post(id, input);
  },
  deletePost: ({id}) => {
    var newDatabase = {};
    for (var post_id in database) {
      if(database.hasOwnProperty(id)) {
        if(id !== post_id) {
          newDatabase[id] = database[id];
        }
      }
    }
    database = newDatabase;
    return id;
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(8000, () => {
  console.log('running GraphQL API server at http://localhost:8000/graphql');
})