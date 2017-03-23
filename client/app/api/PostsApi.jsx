import Api from './Api';

var PostsApi = {
  getAll: function() {
    return Api('/posts', {method: 'GET'});
  }
};

export default PostsApi;
