/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNode = /* GraphQL */ `
  subscription OnCreateNode(
    $filter: ModelSubscriptionNodeFilterInput
    $owner: String
  ) {
    onCreateNode(filter: $filter, owner: $owner) {
      createdAt
      id
      label
      note
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
export const onCreateNodeLink = /* GraphQL */ `
  subscription OnCreateNodeLink(
    $filter: ModelSubscriptionNodeLinkFilterInput
    $owner: String
  ) {
    onCreateNodeLink(filter: $filter, owner: $owner) {
      category
      createdAt
      id
      owner
      source {
        createdAt
        id
        label
        note
        owner
        updatedAt
        __typename
      }
      sourceId
      target {
        createdAt
        id
        label
        note
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
      label
      note
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
export const onDeleteNodeLink = /* GraphQL */ `
  subscription OnDeleteNodeLink(
    $filter: ModelSubscriptionNodeLinkFilterInput
    $owner: String
  ) {
    onDeleteNodeLink(filter: $filter, owner: $owner) {
      category
      createdAt
      id
      owner
      source {
        createdAt
        id
        label
        note
        owner
        updatedAt
        __typename
      }
      sourceId
      target {
        createdAt
        id
        label
        note
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
      label
      note
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
export const onUpdateNodeLink = /* GraphQL */ `
  subscription OnUpdateNodeLink(
    $filter: ModelSubscriptionNodeLinkFilterInput
    $owner: String
  ) {
    onUpdateNodeLink(filter: $filter, owner: $owner) {
      category
      createdAt
      id
      owner
      source {
        createdAt
        id
        label
        note
        owner
        updatedAt
        __typename
      }
      sourceId
      target {
        createdAt
        id
        label
        note
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
