const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const ContestType = require('./contest')
const pgdb = require('../../database/pgdb')
const mdb = require('../../database/mdb')

module.exports = new GraphQLObjectType({
  name: 'MeType',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getContests(obj)
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { mongoPool }, { fieldName }) {
        return mdb(mongoPool).getCount(obj, fieldName)
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mongoPool }, { fieldName }) {
        return mdb(mongoPool).getCount(obj, fieldName)
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mongoPool }, { fieldName }) {
        return mdb(mongoPool).getCount(obj, fieldName)
      }
    }
  }
})
