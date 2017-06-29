import Api from './Api';

var NotificationsApi = {
  _index: function(){
    return Api('/notifications', {method: 'GET'});
  },
};

export default NotificationsApi;
