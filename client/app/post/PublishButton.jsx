import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import helper from  '../components/Helper';

export default class PublishButton extends Component {
  constructor(){
    super();
    this.state = {
      label: '+ Publicar'
    };
  }

  componentDidMount(){
    pubsub.subscribe('file-loading', (msg, data)=>{
      if (data === true){
        this.setState({label: 'Convertendo...'});
      } else{
        this.setState({label: '+ Publicar'});
      }
    });

    pubsub.subscribe('post-publishing', (msg, data)=>{
      if (data === true){
        this.setState({label: 'Publicando...'});
      } else{
        this.setState({label: '+ Publicar'});
      }
    });
  }

  render(){
    if(this.props.isMobile){
      return (
        <button className="btn btn-sm btn-block btn-success"
        data-toggle="modal" data-target="#m_new_post">
          <strong>{this.state.label}</strong>
        </button>
      );
    } else{
      return (
        <button className="btn btn-success"
        data-toggle="modal" data-target="#m_new_post">
          <strong>{this.state.label}</strong>
        </button>
      );
    }
  }
}
