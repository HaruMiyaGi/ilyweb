import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Todo: a.model({
      content: a.string(),
    }),
    Node: a.model({
      name: a.string(),
      sourceLinks: a.hasMany("Links", "sourceId"),
      targetLinks: a.hasMany("Links", "targetId"),
    }),
    Links: a.model({
      name: a.string(),
      sourceId: a.id().required(),
      source: a.belongsTo("Node", "sourceId"),
      targetId: a.id().required(),
      target: a.belongsTo("Node", "targetId"),
    }),
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
