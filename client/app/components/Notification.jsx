import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import NotificationsApi from '../api/NotificationsApi';

export default class Notification extends Component {
  constructor(){
    super();
    this.state = {notifications: []};
  }

  async componentWillMount(){
    App.notifications = App.cable.subscriptions.create("NotificationChannel", {

      connected: function() {
        console.log('oie');
      },

      received: function(newNotification) {
        this.setState({notifications: this.state.notifications.concat(newNotification)});
      }
    });

    try{
      let res = await NotificationsApi._index();
      let resJson = await res.json();

      this.setState({notifications: resJson.notifications});
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <box>
        <a href className="dropdown-toggle header-link" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell fa-2x"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-left mr-2">
        {
          this.state.notifications.map((notification)=>{
            return(
              <div className="dropdown-item"
              key={notification.id}>
                {notification.topic}
              </div>
            );
          })
        }
        </div>
      </box>
    );
  }
}
