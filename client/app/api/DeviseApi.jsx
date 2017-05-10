import Api from './Api';

var DeviseApi = {
  _create: function(user){
    console.log('aqui');
    return Api('/users/sign_in', {method: 'POST', body: JSON.stringify({user : user})});
  }
};

export default DeviseApi;
