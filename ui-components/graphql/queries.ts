/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNode = /* GraphQL */ `
  query GetNode($id: ID!) {
    getNode(id: $id) {
      createdAt
      id
      name
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
export const getNodeLink = /* GraphQL */ `
  query GetNodeLink($id: ID!) {
    getNodeLink(id: $id) {
      category
      createdAt
      id
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
export const listNodeLinks = /* GraphQL */ `
  query ListNodeLinks(
    $filter: ModelNodeLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNodeLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        category
        createdAt
        id
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
