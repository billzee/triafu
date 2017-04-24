import Api from './Api';

var PostVotesApi = {
  _index: function(postId) {
    return Api('/posts/' + postId + '/post_votes', {method: 'GET'});
  },

  _create: function(postId, vote) {
    return Api('/posts/' + postId + '/post_votes', {method: 'POST', body: JSON.stringify({post_vote: vote})});
  }
};

export default PostVotesApi;
