const graphql = require("graphql");
var _ = require('lodash');


const userData=[
    {id:"1", name:'Anna', age:22 , profession:"Programmer"},
    {id:"12", name:'Bella', age:21 , profession:"Baker"},
    {id:"15", name:'Gina', age:25, profession: "Programmer"},
    {id:"123", name:'Georgina', age:66, profession:"Painter" },
]

const{
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

const userType = new GraphQLObjectType({
    name: 'user',
    description: 'documentation for user',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession:{type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Descreption',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(userData, {id: args.id})
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})