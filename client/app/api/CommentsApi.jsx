import Api from './Api';

var CommentsApi = {
  _get: function(postId, page=1) {
    return Api('/posts/' + postId + '/comments/page/' + page, {method: 'GET'});
  },

  _create: function(postId, comment) {
    return Api('/posts/' + postId + '/comments', {method: 'POST', body: JSON.stringify(comment)});
  },
};

export default CommentsApi;
