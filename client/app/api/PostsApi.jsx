import Api from './Api';
import FileApi from './FileApi';

var PostsApi = {
  _index: function(p, c){
    let page = p ? p : 1;
    let category = c ? c : "top";

    return Api('/posts/page/' + page + '?category=' + category, {method: 'GET'});
  },

  _show: function(postReferenceId){
    return Api('/post/' + postReferenceId, {method: 'GET'});
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
    return FileApi('/post/upload_file', {method: 'POST', body: formData});
  },

  _remove_file: function(){
    return Api('/post/remove_file', {method: 'GET'});
  }
};

export default PostsApi;
