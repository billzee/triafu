import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class PostSection extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      original: '',
      preview: null,
      loading: false,
      disableInputs: false,
      submitLabel: 'Publicar',
      errors: {}
    };
  }

  componentDidMount(){
    App.comments = App.cable.subscriptions.create("NotificationChannel", {

      connected: function () {
        console.log('oie');
      },

      received: function (data) {
        console.log(data);
      }
    });
  }

  render(){
    return (
      <box>
        <a href className="dropdown-toggle header-link" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell-o fa-2x"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-left mr-2">
          <div className="dropdown-item">
            teste
          </div>
        </div>
      </box>
    );
  }
}
