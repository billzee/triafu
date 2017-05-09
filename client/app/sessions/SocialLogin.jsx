import React, { Component } from 'react';

export default class SocialLogin extends Component {

  facebookLogin(){
    window.location = "/users/auth/facebook";
  }

  googleLogin(){
    window.location = "/users/auth/google_oauth2";
  }

  render(){
    return(
      <ul className="list-unstyled list-inline text-center pb-3">
        <li className="list-inline-item">
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
    );
  }
}
