import Api from './Api';

var PostVoteApi = {
  _index: function(postId) {
    return Api('/posts/' + postId + '/post_vote', {method: 'GET'});
  },

  _create: function(postId, vote) {
    return Api('/posts/' + postId + '/post_vote', {method: 'POST', body: JSON.stringify({post_vote: vote})});
  }
};

export default PostVoteApi;
