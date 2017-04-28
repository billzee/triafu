import Api from './Api';

var SessionsApi = {
  _create: function(user){
    console.log('aqui');
    return Api('/users/sign_in', {method: 'POST', body: JSON.stringify({user : user})});
  }
};

export default SessionsApi;
