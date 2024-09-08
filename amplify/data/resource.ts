import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a
	.schema({
		NodeLink: a.model({
			category: a.string(),

			sourceId: a.id().required(),
			source: a.belongsTo('Node', 'sourceId'),
			targetId: a.id().required(),
			target: a.belongsTo('Node', 'targetId'),
		}),
		Node: a.model({
			label: a.string().required(),
			note: a.string(),
			sourceNodes: a.hasMany('NodeLink', 'sourceId'),
			targetNodes: a.hasMany('NodeLink', 'targetId'),
		}),
	})
	.authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: 'userPool',
	},
	bug
});
