const graphql = require("graphql");
var _ = require('lodash');
const User = require("../model/user")
const Post = require("../model/post")
const Hobby = require("../model/hobby")

// const userData = [
//     { id: "1", name: 'Anna', age: 22, profession: "Programmer" },
//     { id: "12", name: 'Bella', age: 21, profession: "Baker" },
//     { id: "15", name: 'Gina', age: 25, profession: "Programmer" },
//     { id: "123", name: 'Georgina', age: 66, profession: "Painter" },
// ]

// const HobbyData = [
//     { id: "1", title: 'Programmer', description: "Using computers" },
//     { id: "2", title: 'Swimming', description: "Sweat an feel better" },
//     { id: "3", title: 'Fencing', description: "A hobby for fency people" },
//     { id: "4", title: 'Hiking', description: "Wear hiking boots" },
// ]
// const postData = [
//     { id: "1", comment: 'Building a Mind', userId: "1" },
//     { id: "2", comment: 'GraphQl is Amazing', userId: "123" },
//     { id: "3", comment: 'How to Change the World', userId: "15" }
// ]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
} = graphql

const userType = new GraphQLObjectType({
    name: 'user',
    description: 'documentation for user',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({ userId: parent.id })
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find({ userId: parent.id })
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
                return _.find(User, { id: args.id })
                //return User.find({userId: parent.userId})
            }
        },

        users: {
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

        hobbys: {
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
        posts: {
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                profession: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                })
                return user.save();
            }
        },

        UpdateUser: {
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                profession: { type: GraphQLString },
                resolve(parent, args) {
                    return (updateUser = User.findByIdAndUpdate(
                        args.id,
                        {
                            $set: {
                                name: args.name,
                                age: args.age,
                                profession: args.profession
                            },
                        },
                        { new: true }
                    ));
                }
            }
        },

        DeleteUser: {
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let deleteUser = User.findByIdAndRemove(args.id).exec()
                if (!deleteUser) {
                    throw new "Error"();
                }
                return deleteUser;
            }
        },

        createPost: {
            type: PostType,
            args: {
                // id: { type: GraphQLID },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let post = Post({
                    comment: args.comment,
                    userId: args.userId,
                })
                return post.save()

            }
        },
        UpdatePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                return (updatePost = Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            comment: args.comment,
                        },
                    },
                    { new: true }
                ));
            },
        },

        DeletePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let deletePost = User.findByIdAndRemove(args.id).exec()
                if (!deletePost) {
                    throw new "Error"()
                }
                return deletePost;
            }
        },


        createHobbie: {
            type: HobbyType,
            args: {
                // id: { type: GraphQLID },
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let MutationHobbies = Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                })
                return MutationHobbies.save();

            }
        },

        UpdateHobbies: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return (updateHobbies = Hobby.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            description: args.description,
                        },
                    },
                    { new: true }
                ));
            }
        },
        DeleteHobbies: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let deleteHobby = User.findByIdAndRemove(args.id).exec()
                if (!deleteHobby) {
                    throw new "Error"();
                }
                return deleteHobby;
            }
        },

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})