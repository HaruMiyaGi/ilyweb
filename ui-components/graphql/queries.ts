/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLinks = /* GraphQL */ `
  query GetLinks($id: ID!) {
    getLinks(id: $id) {
      createdAt
      id
      name
      owner
      source {
        createdAt
        id
        name
        owner
        updatedAt
        __typename
      }
      sourceId
      target {
        createdAt
        id
        name
        owner
        updatedAt
        __typename
      }
      targetId
      updatedAt
      __typename
    }
  }
`;
export const getNode = /* GraphQL */ `
  query GetNode($id: ID!) {
    getNode(id: $id) {
      createdAt
      id
      name
      owner
      sourceLinks {
        nextToken
        __typename
      }
      targetLinks {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const listLinks = /* GraphQL */ `
  query ListLinks(
    $filter: ModelLinksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        name
        owner
        sourceId
        targetId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listNodes = /* GraphQL */ `
  query ListNodes(
    $filter: ModelNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        name
        owner
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        content
        createdAt
        id
        owner
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
