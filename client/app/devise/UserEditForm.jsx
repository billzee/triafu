import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import DeviseApi from '../api/DeviseApi';

import helper from '../components/Helper'

export default class UserEdit extends Component {
  constructor(){
    super();
    this.state = {login: '', password: '', postId: '', errors: {}};
    this.login = this.login.bind(this);
  }

  componentWillMount(){
    // this.state.user =

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
        window.location.reload();
      }

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <div class="col-md-6 col-sm">
        <h1>Editar Perfil</h1>
        <hr/>
        <form>
          <div class="form-group">
            <label class="form-control-label">Imagem</label> <br/>
            <img src={this.state.user.image} className="rounded-circle" height="75"/>
          </div>

          <div class="form-group">
            <label class="form-control-label">Nome de Usuário</label>
            <input type="text" className="form-control"
            disabled={this.state.user.username_changed}
            value={this.state.user.username}/>
          </div>

          {
            this.user.username_changed ?
            (<small>Você já alterou o nome de usuário uma vez.</small>)
            :
            (
              <small>
                <strong class="text-warning">Importante:</strong> o nome de usuário só pode ser alterado uma vez.
              </small>
            )
          }

          <div class="form-group">
            <label class="form-control-label">Nome Completo</label>
            <input type="text" className="form-control" value={this.state.user.full_username}/>
          </div>

          <div class="form-group">
            <label class="form-control-label">e-mail</label>
            <input type="email" className="form-control" value={this.state.user.email}/>
          </div>

          <br/>
          <hr/>
          {
            // <div class="form-group">
            //   <label class="form-control-label">Senha Atual (para confirmar as alterações)</label>
            //   <%= f.password_field :current_password, class: "form-control", autocomplete: "off" %>
            // </div>
            //
            // <% if devise_mapping.confirmable? && resource.pending_reconfirmation? %>
            //   <div>Currently waiting confirmation for: <%= resource.unconfirmed_email %></div>
            // <% end %>
          }
          <input type="submit" value="Salvar" className="btn btn-success float-right"/>
          </form>
      </div>

    );
  }
}
