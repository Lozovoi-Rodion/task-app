import { createServer } from "@graphql-yoga/node";
import { IResolvers } from "@graphql-tools/utils";
import mysql from "serverless-mysql";

const typeDefs = /* GraphQL */ `
  enum TaskStatus {
    active
    completed
  }
  type Task {
    id: Int!
    title: String!
    status: TaskStatus!
  }
  input CreateTaskInput {
    title: String!
  }
  input UpdateTaskInput {
    id: Int!
    title: String
    status: TaskStatus
  }
  type Query {
    tasks(status: TaskStatus): [Task!]!
    task(id: Int!): Task
  }
  type Mutation {
    createTask(input: CreateTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: Int!): Task
  }
`;

interface IContext {
  db: mysql.ServerlessMysql;
}

const resolvers: IResolvers<any, IContext> = {
  Query: {
    tasks(parent, args, context) {
      return [];
    },
    task(parent, args, context) {
      return parent;
    },
  },
  Mutation: {
    createTask(parent, args, context) {
      return null;
    },
    updateTask(parent, args, context) {
      return null;
    },
    deleteTask(parent, args, context) {
      return null;
    },
  },
};

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  context: {
    db,
  },
});

export default server;
