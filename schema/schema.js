const graphql = require("graphql");
var _ = require('lodash');


const userData = [
    { id: "1", name: 'Anna', age: 22, profession: "Programmer" },
    { id: "12", name: 'Bella', age: 21, profession: "Baker" },
    { id: "15", name: 'Gina', age: 25, profession: "Programmer" },
    { id: "123", name: 'Georgina', age: 66, profession: "Painter" },
]

const HobbyData = [
    { id: "1", title: 'Programmer', description: "Using computers" },
    { id: "2", title: 'Swimming', description: "Sweat an feel better" },
    { id: "3", title: 'Fencing', description: "A hobby for fency people" },
    { id: "4", title: 'Hiking', description: "Wear hiking boots" },
]
const postData = [
    { id: "1", comment: 'Building a Mind', userId: "1" },
    { id: "2", comment: 'GraphQl is Amazing', userId: "123" },
    { id: "3", comment: 'How to Change the World', userId: "15" }
]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql

const userType = new GraphQLObjectType({
    name: 'user',
    description: 'documentation for user',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },

        post: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, { userId: parent.id })
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(HobbyData, { userId: parent.id })
            }
        }
    })
});
const HobbyType = new GraphQLObjectType({
    name: "Hobby",
    description: 'Hobby Descreption',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: userType,
            resolve(parent, args) {
                return _.find(userData, { id: parent.userId })
            }
        }
    })
})

//Post type

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: { type: GraphQLInt },
        comment: { type: GraphQLString },
        user: {
            type: userType,
            resolve(parent, args) {
                return _.find(userData, { id: parent.userId })
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Descreption',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(userData, { id: args.id })
            }
        },

        users:{
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return userData;
            }
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return _.find(HobbyData, { id: args.id })
            }
        },

        hobbys:{
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return HobbyData;
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                return _.find(postData, { id: args.id })
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postData;
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: userType,
            args: {
                // id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                }
                return user
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: { type: GraphQLID },
                comment: { type: GraphQLString },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId,
                }
                return post

            }
        },
        createHobbie: {
            type: HobbyType,
            args: {
                // id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let MutationHobbies = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                }
                return MutationHobbies

            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})