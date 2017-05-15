import React, { Component } from 'react';

import DeviseApi from '../api/DeviseApi';

export default class SocialConnect extends Component {

  constructor(){
    super();
    this.state = {user: ''};
  }

  popupCenter(url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'toolbar=0,location=0,menubar=0,scrollbars=0, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    if (window.focus) {
      newWindow.focus();
    }
  }

  async componentWillMount(){
    try{
      let res = await DeviseApi._index();
      let resJson = await res.json();

      this.setState({user: resJson.user});
      console.log(this.state.user);
    } catch(error){
      console.log(error);
    }
  }

  facebookConnect(){
    this.popupCenter("/users/auth/facebook", '_blank', 800, 800);
  }

  googleConnect(){
    this.popupCenter("/users/auth/google_oauth2", '_blank', 800, 800);
  }

  render(){
    return(
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item mr-4">
          <button className={"btn btn-facebook" + (this.state.user.facebookConnect ? "" : " disconnected")}
          onClick={()=> this.facebookConnect()} type="button">
            <i className="fa fa-facebook-f fa-1x"></i>
            <span className="ml-1">Facebook</span>
          </button>
          {
            this.state.user.facebookConnect ?
              (<i className="fa fa-check text-success"/>)
            : (<i className="fa fa-times text-danger"/>)
          }
        </li>
        <li className="list-inline-item">
          <button className={"btn btn-google" + (this.state.user.googleConnect ? "" : " disconnected")}
          onClick={()=> this.googleConnect()} type="button">
            <i className="fa fa-google-plus fa-1x"></i>
            <span className="ml-1">Google</span>
          </button>
          {
            this.state.user.googleConnect ?
              (<i className="fa fa-check text-success"/>)
            : (<i className="fa fa-times text-danger"/>)
          }
        </li>
      </ul>
    );
  }
}
