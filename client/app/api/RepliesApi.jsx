import Api from './Api';

var RepliesApi = {
  _get: function(postId, commentId, page=1) {
    return Api('/comments/' + commentId + '/replies/page/' + page, {method: 'GET'});
  },

  _create: function(postId, commentId, reply) {
    return Api('/comments/' + commentId + '/replies', {method: 'POST', body: JSON.stringify(reply)});
  }
};

export default RepliesApi;
