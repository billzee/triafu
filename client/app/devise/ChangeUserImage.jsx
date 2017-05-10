import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import DeviseApi from '../api/DeviseApi';

import helper from '../components/Helper'

export default class ChangeUserImage extends Component {
  constructor(){
    super();
    this.state = {
      image: '',
      loading: false,
      errors: {}
    };
  }

  async componentWillMount(){
    this.setState({loading: true});

    try{
      let res = await DeviseApi._index();
      let resJson = await res.json();

      this.setState({
        image: resJson.user.image.url
      });

      console.log(resJson.user.image);

    } catch(error){
      console.log(error);
    }

    this.setState({loading: false});
  }

  async update(e){
    e.preventDefault();
    if(this.state.loading) return;
    this.setState({loading: true});

    try{
      let res = await DeviseApi._updateRegistration(this.state);
      let resJson = await res.json();

      if (resJson.errors) window.location.reload();

    } catch(error){
      console.log(error);
    }

    this.setState({loading: false});
  }

  render(){
    return(
      <box>
        <h1>Trocar Imagem</h1>
        <hr/>
        <div className="text-center">
          <button type="button" className="btn btn-purple" onClick="">Trocar</button>
          <br/>
          <img src={"/assets/" + this.state.image} className="rounded-circle" height="150"/>
        </div>
      </box>

    );
  }
}
