import Api from './Api';

var PostsApi = {
  _index: function(page=1) {
    return Api('/posts/page/' + page, {method: 'GET'});
  },

  _get: function(postId) {
    return Api('/posts/' + postId, {method: 'GET'});
  },

  _create: function(post) {
    return Api('/posts', {method: 'POST', body: JSON.stringify(post)});
  },

  _remove_media: function(post) {
    return Api('/post/remove_media', {method: 'GET'});
  }
};

export default PostsApi;
