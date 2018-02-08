import Api from './Api';

var NotificationsApi = {
  _bell: function(){
    return Api('/notificacoes/bell', {method: 'GET'});
  },

  _index: function(page=1){
    return Api('/notificacoes/page/' + page, {method: 'GET'});
  },

  _read: function(){
    return Api('/notificacoes/read', {method: 'GET'});
  },
};

export default NotificationsApi;
