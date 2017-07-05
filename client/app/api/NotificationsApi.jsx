import Api from './Api';

var NotificationsApi = {
  _bell: function(){
    return Api('/notifications/bell', {method: 'GET'});
  },

  _index: function(page=1){
    return Api('/notifications/page/' + page, {method: 'GET'});
  },

  _read: function(){
    return Api('/notifications/read', {method: 'GET'});
  },
};

export default NotificationsApi;
