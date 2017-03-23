import Api from './Api';

var CommentsApi = {
  getAll: function(postId) {
    return Api('/posts/' + postId + '/comments', {method: 'GET'});
  },

  comment: function(postId, comment) {
    return Api('/posts/' + postId + '/comments',{ method: 'POST', body: JSON.stringify(comment)});
  },

  reply: function(postId, commentId, comment) {
    return Api('/posts/' + postId + '/comments/' + commentId + '/reply', { method: 'POST', body: JSON.stringify(comment)});
  }
};

export default CommentsApi;
