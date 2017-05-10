import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import DeviseApi from '../api/DeviseApi';
import SocialLogin from './SocialLogin';

import helper from '../components/Helper'

export default class Login extends Component {
  constructor(){
    super();
    this.state = {login: '', password: '', postId: '', errors: {}};
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    pubsub.subscribe('auth-error', (msg, data)=>{
      this.setState({errors: data});
    });

    pubsub.subscribe('watch-post', (msg, data)=>{
      this.setState({postId: data.postId});
    });

    $('#m_login').on('hidden.bs.modal', ()=> {
      this.setState({errors: ''});
    });
  }

  async login(e){
    if(e) e.preventDefault();

    try{
      let res = await DeviseApi._createSession(this.state);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        this.setState({errors: resJson.errors});
      }
      // } else if(this.state.postId){
      //   window.location = "/posts/" + this.state.postId;
      // } else{
      //   window.location.reload();
      // }

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <div className="modal-body">
        { this.state.errors.hasOwnProperty('auth') ?
          (
            <div className="alert alert-danger">
              <small>{this.state.errors.auth}</small>
            </div>
          ) : null
        }

        <p className="text-muted text-center">Usando uma rede social</p>
        <SocialLogin />

        <hr className="or text-muted"/>

        <p className="text-muted text-center pt-3">Usando seu e-mail ou nome de usuário</p>

        <form onSubmit={this.login} method="post">
          <div className="form-group">
            <label className="form-control-label">e-mail/nome de usuário</label>
            <input className="form-control" autoFocus="true"
            onChange={helper.handleChange.bind(this, 'login')}
            value={this.state.login}></input>
          </div>

          <div className="form-group">
            <label className="form-control-label">senha</label>
            <input type="password" className="form-control" autoComplete="off"
            onChange={helper.handleChange.bind(this, 'password')}
            value={this.state.password}></input>

            <a href="/users/password/new" className="float-right">esqueceu/não tem senha?</a>
          </div>

          <br/>
          <input type="submit" className="btn btn-block btn-success" value="Entrar"></input>

        </form>
      </div>
    );
  }
}
