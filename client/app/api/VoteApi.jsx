import Api from './Api';

var VoteApi = {
  _post_index: function(postId){
    return Api('/posts/' + postId + '/post_vote', {method: 'GET'});
  },

  _post_create: function(postId, vote){
    return Api('/posts/' + postId + '/post_vote', {method: 'POST', body: JSON.stringify({post_vote: vote})});
  },

  _comment_index: function(commentId){
    return Api('/comments/' + commentId + '/comment_vote', {method: 'GET'});
  },

  _comment_create: function(commentId, vote){
    return Api('/comments/' + commentId + '/comment_vote', {method: 'POST', body: JSON.stringify({comment_vote: vote})});
  },

  _reply_index: function(commentId){
    return Api('/replies/' + commentId + '/reply_vote', {method: 'GET'});
  },

  _reply_create: function(commentId, vote){
    return Api('/replies/' + commentId + '/reply_vote', {method: 'POST', body: JSON.stringify({reply_vote: vote})});
  }
};

export default VoteApi;
