import Api from './Api';

var NotificationsApi = {
  _index: function(){
    return Api('/notifications', {method: 'GET'});
  },

  _read: function(){
    return Api('/notifications/read', {method: 'GET'});
  },
};

export default NotificationsApi;
