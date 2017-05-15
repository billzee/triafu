import Api from './Api';
import FileApi from './FileApi';

var DeviseApi = {
  _index: function(user){
    return Api('/current_user', {method: 'GET'});
  },

  _createSession: function(user){
    return Api('/users/sign_in', {method: 'POST', body: JSON.stringify({user : user})});
  },

  _updateUserImage: function(file){
    let formData = new FormData();
    formData.append('user[avatar]', file);
    return FileApi('/user/update_avatar', {method: 'PUT', body: formData});
  },

  _disconnectSocialNetwork: function(network){
    return Api('/user/disconnect_social_network', {method: 'PUT', body: JSON.stringify({network: network})});
  },
};

export default DeviseApi;
