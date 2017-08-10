import React, { Component } from 'react';
import helper from '../components/Helper'

import DeviseApi from '../api/DeviseApi';

export default class SocialConnect extends Component {

  constructor(){
    super();
    this.state = {user: ''};
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
    helper.popupCenter("/users/auth/facebook", '_blank', 800, 800);
  }

  googleConnect(){
    helper.popupCenter("/users/auth/google_oauth2", '_blank', 800, 800);
  }

  async disconnect(network){
    try{
      let res = await DeviseApi._disconnectSocialNetwork(network);
      window.location.reload();
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <ul className="list-unstyled">
        <li className="mb-3">
          <div className="row">
            <div className="col-3 align-self-center text-muted">
              Facebook
            </div>

            <div className="col-7">
              {
                this.state.user.facebookConnected ?
                (
                  <button className="btn btn-facebook btn-block"
                  onClick={()=> this.disconnect("facebook")} type="button">
                    <i className="fa fa-facebook-f fa-1x"></i>
                    <span className="ml-2">
                      Desconectar
                    </span>
                  </button>
                )
                :
                (
                  <button className="btn btn-facebook btn-block disconnected"
                  onClick={()=> this.facebookConnect()} type="button">
                    <i className="fa fa-facebook-f fa-1x"></i>
                    <span className="ml-2">
                      Conectar
                    </span>
                  </button>
                )
              }
            </div>

            <div className="col-2 align-self-center text-right">
              {
                this.state.user.facebookConnected ?
                  (<i className="fa fa-check text-success"/>)
                : (<i className="fa fa-times text-danger"/>)
              }
            </div>
          </div>
        </li>

        <li>
          <div className="row">
            <div className="col-3 align-self-center text-muted">
              Google
            </div>

            <div className="col-7">
              {
                this.state.user.googleConnected ?
                (
                  <button className="btn btn-google btn-block"
                  onClick={()=> this.disconnect("google")} type="button">
                    <i className="fa fa-google fa-1x"></i>
                    <span className="ml-2">
                      Desconectar
                    </span>
                  </button>
                )
                :
                (
                  <button className="btn btn-google btn-block disconnected"
                  onClick={()=> this.googleConnect()} type="button">
                    <i className="fa fa-google fa-1x"></i>
                    <span className="ml-2">
                      Conectar
                    </span>
                  </button>
                )
              }
            </div>

            <div className="col-2 align-self-center text-right">
              {
                this.state.user.googleConnected ?
                  (<i className="fa fa-check text-success"/>)
                : (<i className="fa fa-times text-danger"/>)
              }
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
