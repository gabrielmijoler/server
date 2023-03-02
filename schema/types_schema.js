const graphql = require("graphql");
var _ = require('lodash');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Descreption',
    fields: {}
});




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})