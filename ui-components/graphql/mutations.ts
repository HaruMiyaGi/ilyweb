/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLinks = /* GraphQL */ `
  mutation CreateLinks(
    $condition: ModelLinksConditionInput
    $input: CreateLinksInput!
  ) {
    createLinks(condition: $condition, input: $input) {
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
export const createNode = /* GraphQL */ `
  mutation CreateNode(
    $condition: ModelNodeConditionInput
    $input: CreateNodeInput!
  ) {
    createNode(condition: $condition, input: $input) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $condition: ModelTodoConditionInput
    $input: CreateTodoInput!
  ) {
    createTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const deleteLinks = /* GraphQL */ `
  mutation DeleteLinks(
    $condition: ModelLinksConditionInput
    $input: DeleteLinksInput!
  ) {
    deleteLinks(condition: $condition, input: $input) {
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
export const deleteNode = /* GraphQL */ `
  mutation DeleteNode(
    $condition: ModelNodeConditionInput
    $input: DeleteNodeInput!
  ) {
    deleteNode(condition: $condition, input: $input) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $condition: ModelTodoConditionInput
    $input: DeleteTodoInput!
  ) {
    deleteTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const updateLinks = /* GraphQL */ `
  mutation UpdateLinks(
    $condition: ModelLinksConditionInput
    $input: UpdateLinksInput!
  ) {
    updateLinks(condition: $condition, input: $input) {
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
export const updateNode = /* GraphQL */ `
  mutation UpdateNode(
    $condition: ModelNodeConditionInput
    $input: UpdateNodeInput!
  ) {
    updateNode(condition: $condition, input: $input) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $condition: ModelTodoConditionInput
    $input: UpdateTodoInput!
  ) {
    updateTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
