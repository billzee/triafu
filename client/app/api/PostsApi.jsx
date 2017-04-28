import Api from './Api';
import MediaApi from './MediaApi';

var PostsApi = {
  _index: function(page=1){
    return Api('/posts/page/' + page, {method: 'GET'});
  },

  _get: function(postId){
    return Api('/posts/' + postId, {method: 'GET'});
  },

  _create: function(post){
    return Api('/posts', {method: 'POST', body: JSON.stringify(post)});
  },

  _vote: function(postId, vote){
    return Api('/posts/' + postId + '/vote', {method: 'POST', body: JSON.stringify({post_vote: vote})});
  },

  _upload_media: function(file){
    let formData = new FormData();
    formData.append('post[image]', file);
    console.log(file);
    return MediaApi('/post/upload_media', {body: formData});
  },

  _remove_media: function(){
    return Api('/post/remove_media', {method: 'GET'});
  }
};

export default PostsApi;
