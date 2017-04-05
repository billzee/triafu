import Api from './Api';

var PostsApi = {
  index: function() {
    return Api('/posts', {method: 'GET'});
  },

  create: function(post) {
    return Api('/posts', {method: 'POST', body: JSON.stringify(post)});
  }

};

export default PostsApi;
