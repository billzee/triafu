var Helper = {

  commentPhotoSize: "48px",

  replyPhotoSize: "38px",

  maxLengthForRelease: 100,

  handleChange: function(input, e){
    var field = {errors: {}};
    field[input] = e.target.value;
    this.setState(field);
  },

  hasProperty: function(obj) {
    for(var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return true;
      }
    }
    return false;
  }
};

export default Helper;
