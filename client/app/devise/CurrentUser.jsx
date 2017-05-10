import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import DeviseApi from '../api/DeviseApi';

import helper from '../components/Helper'

export default class Login extends Component {
  constructor(){
    super();
    this.state = {user: '', errors: {}};
  }

  async componentWillMount(){
    try{
      let res = await DeviseApi._index();
      let resJson = await res.json();

      this.setState({user: resJson.user});

      console.log(this.state.user.image.url);
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(

        <div className="profile-actions header-item">
        <a href="#" className="dropdown-toggle header-link" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img className="rounded-circle" height="36" />
        </a>
        <div className="dropdown-menu dropdown-menu-left mr-2" aria-labelledby="dropdown02">
        <div className="dropdown-header text-center">{this.state.user.username}</div>
        <div className="dropdown-divider"></div>
        <a href="/users/edit" className="dropdown-item">Editar perfil</a>
        <a href="/users/sign_out" className="dropdown-item" method="delete">Sair</a>
        </div>
        </div>
    );
  }
}
