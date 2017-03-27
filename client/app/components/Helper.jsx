var Helper = {

  handleChange: function(input, e){
    var field = {};
    field[input] = e.target.value;
    this.setState(field);
  }
  
};

export default Helper;
