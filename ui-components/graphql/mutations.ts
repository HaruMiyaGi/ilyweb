/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNode = /* GraphQL */ `
  mutation CreateNode(
    $condition: ModelNodeConditionInput
    $input: CreateNodeInput!
  ) {
    createNode(condition: $condition, input: $input) {
      createdAt
      id
      label
      owner
      sourceNodes {
        nextToken
        __typename
      }
      targetNodes {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const createNodeLink = /* GraphQL */ `
  mutation CreateNodeLink(
    $condition: ModelNodeLinkConditionInput
    $input: CreateNodeLinkInput!
  ) {
    createNodeLink(condition: $condition, input: $input) {
      category
      createdAt
      id
      owner
      source {
        createdAt
        id
        label
        owner
        updatedAt
        __typename
      }
      sourceId
      target {
        createdAt
        id
        label
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
      label
      owner
      sourceNodes {
        nextToken
        __typename
      }
      targetNodes {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const deleteNodeLink = /* GraphQL */ `
  mutation DeleteNodeLink(
    $condition: ModelNodeLinkConditionInput
    $input: DeleteNodeLinkInput!
  ) {
    deleteNodeLink(condition: $condition, input: $input) {
      category
      createdAt
      id
      owner
      source {
        createdAt
        id
        label
        owner
        updatedAt
        __typename
      }
      sourceId
      target {
        createdAt
        id
        label
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
      label
      owner
      sourceNodes {
        nextToken
        __typename
      }
      targetNodes {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const updateNodeLink = /* GraphQL */ `
  mutation UpdateNodeLink(
    $condition: ModelNodeLinkConditionInput
    $input: UpdateNodeLinkInput!
  ) {
    updateNodeLink(condition: $condition, input: $input) {
      category
      createdAt
      id
      owner
      source {
        createdAt
        id
        label
        owner
        updatedAt
        __typename
      }
      sourceId
      target {
        createdAt
        id
        label
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
