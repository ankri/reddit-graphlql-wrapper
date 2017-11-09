const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const postType = require('./Post');
const { loadSubredditListings } = require('../reddit-api');

const createPostListingsType = (description, listingType) => {
  const args = {
    after: {
      description: 'Load posts after this fullname id',
      type: GraphQLString
    },
    before: {
      description: 'Load posts before this fullname id',
      type: GraphQLString
    },
    limit: {
      description: 'Load this many posts',
      type: GraphQLInt
    }
  };

  return {
    args,
    description,
    type: new GraphQLNonNull(new GraphQLList(postType)),
    resolve: subreddit =>
      loadSubredditListings(subreddit.data.display_name, listingType).then(
        listing => listing.data.children
      )
  };
};

module.exports = createPostListingsType;