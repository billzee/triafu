import Api from './Api';

var CommentVoteApi = {
  _index: function(commentId) {
    return Api('/comments/' + commentId + '/comment_vote', {method: 'GET'});
  },

  _create: function(commentId, vote) {
    return Api('/comments/' + commentId + '/comment_vote', {method: 'POST', body: JSON.stringify({comment_vote: vote})});
  }
};

export default CommentVoteApi;
