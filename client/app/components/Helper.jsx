var Helper = {

  commentPhotoSize: "48px",

  replyPhotoSize: "38px",

  maxLengthForRelease: 100,

  handleChange: function(input, e){
    var field = {};
    field[input] = e.target.value;
    this.setState(field);
  }

};

export default Helper;
