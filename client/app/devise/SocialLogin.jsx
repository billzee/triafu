import React, { Component } from 'react';

export default class SocialLogin extends Component {

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

  facebookLogin(){
    this.popupCenter("/conta/auth/facebook", '_blank', 800, 800);
  }

  googleLogin(){
    this.popupCenter("/conta/auth/google_oauth2", '_blank', 800, 800);
  }

  render(){
    return(
      <box>
        <p className="text-muted text-center">Usando uma rede social</p>
        <ul className="list-unstyled list-inline text-center pb-3">
          <li className="list-inline-item mr-3">
            <button className="btn btn-facebook"
            onClick={()=> this.facebookLogin()}>
              <i className="fa fa-facebook-f fa-1x"></i>
              <span className="ml-1">Facebook</span>
            </button>
          </li>
          <li className="list-inline-item">
            <button className="btn btn-google"
            onClick={()=> this.googleLogin()}>
              <i className="fa fa-google-plus fa-1x"></i>
              <span className="ml-1">Google</span>
            </button>
          </li>
        </ul>
        <hr className="or text-muted"/>
      </box>
    );
  }
}
