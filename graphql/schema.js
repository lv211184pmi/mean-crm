const {buildSchema} = require('graphql')

module.exports = buildSchema(`

    type User {
        email: String!
        password: String!
    }

    type Category {
        name: String!
        imageSrc: String
        user: User!
    }

    input CategoryData {
        name: String!
        imageSrc: String
    }

    type RootQuery {
        hello: String
    }

    type RootMutation {
        createCategory(categoryInput: CategoryData): Category!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)