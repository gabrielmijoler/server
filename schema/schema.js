const graphiql = require('graphgql')

const{
    GraphQLObjectType,
    GraphQLID
} = graphiql

const UserType = new GraphQLObjectType({
    name:'user',
    description:'documentation for user',
    field: () => ({
        id:{type: GraphQLID},
        name:'James',
        age:32
    })
})