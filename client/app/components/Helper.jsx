import pubsub from 'pubsub-js'

var Helper = {
  commentPhotoSize: "48px",

  replyPhotoSize: "38px",

  maxLengthForRelease: 100,

  maxFileSize: 5000000,

  minFileSize: 10000,

  urlify: function(text){
    var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return text.replace(urlRegex, function(url) {
      if (!/^(f|ht)tps?:\/\//i.test(url)){
        var hrefUrl = "http://" + url;
      } else{
        var hrefUrl = url;
      }
      return '<a target="_blank" rel="nofollow" href="' + hrefUrl + '">' + url + '</a>';
    })
  },

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
  },

  buildNotificationBody: function(topic){
    switch(topic) {
      case "Comment":
        return "comentou a sua publicação"
        break;
      case "Reply":
        return "respondeu ao seu comentário"
        break;
      case "Funny":
        return "classificou sua publicação como engraçada"
        break;
      case "Smart":
        return "classificou sua publicação como interessante"
        break;
      case "ReplyVote":
        return "positivou sua resposta"
        break;
      case "CommentVote":
        return "positivou seu comentário"
        break;
      default:
        return "executou uma ação nesta publicação"
        break;
    }
  }
};

export default Helper;
