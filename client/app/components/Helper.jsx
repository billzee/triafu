import pubsub from 'pubsub-js'

var Helper = {
  commentPhotoSize: "48px",

  replyPhotoSize: "38px",

  maxLengthForRelease: 100,

  maxFileSize: 10000000,

  minFileSize: 20000,

  handleChange: function(input, e){
    var field = {errors: {}};
    field[input] = e.target.value;
    this.setState(field);
  },

  hasProperty: function(obj){
    for(var prop in obj){
      if(Object.prototype.hasOwnProperty.call(obj, prop)){
        return true;
      }
    }
    return false;
  },

  authErrorDispatcher: function(errors){
    if(errors.auth){
      pubsub.publish('auth-error', errors);
      $('.modal').modal('hide');
      $('#m_login').modal('show');
    }
  },

  pluralize: function(val, str){
    return (val === 1 || val === -1) ? str : str + "s";
  },

  popupCenter: function(url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'toolbar=0,location=0,menubar=0,scrollbars=0, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    if (window.focus){
      newWindow.focus();
    }
  },

  toggleShareLinks: function(){
    $('#m_share_links').modal('toggle');
  },

  toggleComments: function(){
    $('#m_comments').modal('toggle');
  }
};

export default Helper;
