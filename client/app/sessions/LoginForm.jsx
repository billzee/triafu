import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import SessionsApi from '../api/SessionsApi';

import helper from '../components/Helper'

export default class Login extends Component {
  constructor(){
    super();
    this.state = {email: '', password: '', postId: '', errors: {}};
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    pubsub.subscribe('auth-error', (msg, data)=>{
      this.setState({error: data});
    });

    pubsub.subscribe('watch-post', (msg, data)=>{
      this.setState({postId: data.postId});
    });

    $('#m_login').on('hidden.bs.modal', ()=> {
      this.setState({error: ''});
    });
  }

  async login(e){
    if(e) e.preventDefault();

    try{
      let res = await SessionsApi._create(this.state);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.errors){
        this.setState({errors: resJson.errors});
      } else if(this.state.postId){
        window.location = "/posts/" + this.state.postId;
      } else{
        window.location.reload;
      }

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <div className="modal-body">
        { this.state.errors.hasOwnProperty('auth')  ?
          (
            <div className="alert alert-danger">
              <small>{this.state.errors.auth}</small>
            </div>
          ): null
        }

        <p className="text-muted text-center">Usando uma rede social</p>

        <ul className="list-unstyled list-inline text-center pb-3">
          <li className="list-inline-item">
            <button className="btn btn-facebook">
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

        <hr className="or text-muted"/>

        <p className="text-muted text-center pt-3">Usando seu e-mail de cadastro</p>

        <form onSubmit={this.login} method="post">
          <div className="form-group">
            <label className="form-control-label">e-mail</label>
            <input type="email" className="form-control" autoFocus="true"
            onChange={helper.handleChange.bind(this, 'email')}
            value={this.state.email}></input>
          </div>

          <div className="form-group">
            <label className="form-control-label">senha</label>
            <input type="password" className="form-control" autoComplete="off"
            onChange={helper.handleChange.bind(this, 'password')}
            value={this.state.password}></input>

            <a href="" className="float-right">Esqueceu a senha?</a>
          </div>

          <br />

          <input type="submit" className="btn btn-block btn-success" value="Entrar"></input>

        </form>
      </div>
    );
  }
}
