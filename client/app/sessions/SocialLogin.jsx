import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import SessionsApi from '../api/SessionsApi';

import helper from '../components/Helper'

export default class Login extends Component {
  constructor(){
    super();
    this.state = {fbConnected: false};
  }

  componentWillMount(){
    window.fbAsyncInit = function(){
      FB.init({
        appId      : '1029182447212780',
        xfbml      : true,
        version    : 'v2.9'
      });
      FB.AppEvents.logPageView();
      FB.getLoginStatus(function(res) {
        if (res.status === 'connected') this.setState({fbConnected: true})
      }.bind(this));
    }.bind(this);

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/pt_BR/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  facebookLogin(){
    if(!this.state.fbConnected){
      FB.login(function(res) {
        if (res.status === 'connected') this.setState({fbConnected: true});
      }.bind(this));
    } else{
      FB.api('/me', function(res) {
        console.log(res);
      }.bind(this));
    }
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
          <button className="btn btn-google">
            <i className="fa fa-google-plus fa-1x"></i>
            <span className="ml-1">Google</span>
          </button>
        </li>
      </ul>
    );
  }
}
