const graphql = require("graphql");
var _ = require('lodash');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
} = graphql

//Scalar types


const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents a Person Type',
    fields:() => ({
        id:{type: GraphQLID},
        name:{type: new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)},
        isMarried:{type: GraphQLBoolean},
        gpa:{type: GraphQLFloat},
        
        jusAType:{
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Descreption',
    fields: {
        person:{
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    name:'Antonio',
                    age:34,
                    isMarried: true,
                    gpa: 4.0,
                }
                return personObj;
            }
        }
    }
});





module.exports = new GraphQLSchema({
    query: RootQuery,
})