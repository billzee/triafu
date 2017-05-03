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
      $('#m_login').modal('show');
    }
  },

  pluralize: function(val, str){
    return (val === 1 || val === -1) ? str : str + "s";
  }
};

export default Helper;
