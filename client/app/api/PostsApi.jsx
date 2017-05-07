import Api from './Api';
import FileApi from './FileApi';

var PostsApi = {
  _index: function(categoryId=1, page=1){
    console.log(categoryId, " categoriaaa");
    return Api('/posts/page/' + page + '?category_id=' + categoryId, {method: 'GET'});
  },

  _show: function(postId){
    return Api('/posts/' + postId, {method: 'GET'});
  },

  _create: function(post){
    return Api('/posts', {method: 'POST', body: JSON.stringify(post)});
  },

  _vote: function(postId, vote){
    return Api('/posts/' + postId + '/vote', {method: 'POST', body: JSON.stringify({post_vote: vote})});
  },

  _upload_file: function(file){
    let formData = new FormData();
    formData.append('post[file]', file);
    return FileApi('/post/upload_file', {body: formData});
  },

  _remove_file: function(){
    return Api('/post/remove_file', {method: 'GET'});
  }
};

export default PostsApi;
