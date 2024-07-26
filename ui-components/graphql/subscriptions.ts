/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLinks = /* GraphQL */ `
  subscription OnCreateLinks(
    $filter: ModelSubscriptionLinksFilterInput
    $owner: String
  ) {
    onCreateLinks(filter: $filter, owner: $owner) {
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
export const onCreateNode = /* GraphQL */ `
  subscription OnCreateNode(
    $filter: ModelSubscriptionNodeFilterInput
    $owner: String
  ) {
    onCreateNode(filter: $filter, owner: $owner) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onCreateTodo(filter: $filter, owner: $owner) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLinks = /* GraphQL */ `
  subscription OnDeleteLinks(
    $filter: ModelSubscriptionLinksFilterInput
    $owner: String
  ) {
    onDeleteLinks(filter: $filter, owner: $owner) {
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
export const onDeleteNode = /* GraphQL */ `
  subscription OnDeleteNode(
    $filter: ModelSubscriptionNodeFilterInput
    $owner: String
  ) {
    onDeleteNode(filter: $filter, owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onDeleteTodo(filter: $filter, owner: $owner) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLinks = /* GraphQL */ `
  subscription OnUpdateLinks(
    $filter: ModelSubscriptionLinksFilterInput
    $owner: String
  ) {
    onUpdateLinks(filter: $filter, owner: $owner) {
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
export const onUpdateNode = /* GraphQL */ `
  subscription OnUpdateNode(
    $filter: ModelSubscriptionNodeFilterInput
    $owner: String
  ) {
    onUpdateNode(filter: $filter, owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onUpdateTodo(filter: $filter, owner: $owner) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
