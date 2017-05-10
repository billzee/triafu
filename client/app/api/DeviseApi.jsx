import Api from './Api';

var DeviseApi = {
  _index: function(user){
    return Api('/current_user', {method: 'GET'});
  },

  _create: function(user){
    return Api('/users/sign_in', {method: 'POST', body: JSON.stringify({user : user})});
  }
};

export default DeviseApi;
