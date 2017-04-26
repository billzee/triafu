import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class Login extends Component {
  constructor(){
    super();
    this.state = {error: ''};
  }

  componentDidMount(){
    pubsub.subscribe('auth-error', (msg, data)=>{
      this.setState({error: data});
    });

    $('#m_login').on('hidden.bs.modal', ()=> {
      this.setState({error: ''});
    });
  }

  render(){
    return(
      <box>
        { this.state.error ?
          (
            <div className="alert alert-danger">
              <small>{this.state.error}</small>
            </div>
          )
          : null
        }
      </box>
    );
  }
}
