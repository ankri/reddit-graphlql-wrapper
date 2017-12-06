const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const { loadSubreddit } = require('./reddit-api');
const subredditType = require('./types/Subreddit');
const userType = require('./types/User');

const redditSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RedditAPI',
    description: 'Call the Reddit API via GraphQL',
    fields: {
      subreddit: {
        type: subredditType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the subreddit'
          }
        },
        resolve: (root, { name }) => {
          const subredditName = name.replace(/\W/, '');
          return loadSubreddit(subredditName);
        }
      },
      user: {
        type: userType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the user'
          },
          after: {
            description: 'Load posts after this fullname id',
            type: GraphQLString
          },
          limit: {
            description: 'Load this many posts',
            type: GraphQLInt
          }
        },
        resolve: (root, { name, ...args }) => {
          const username = name.replace(/\W/, '');
          return { username, ...args };
        }
      }
    }
  })
});

module.exports = redditSchema;
