import React, { Component } from 'react';

import NotificationsApi from '../api/NotificationsApi';

export default class Notification extends Component {
  constructor(){
    super();
    this.state = {notifications: []};
  }

  async getNotifications(){
    try{
      let res = await NotificationsApi._index();
      let resJson = await res.json();

      console.log(resJson);

      this.setState({notifications: resJson.notifications});
    } catch(error){
      console.log(error);
    }
  }

  componentWillMount(){
    App.notifications = App.cable.subscriptions.create("NotificationChannel", {

      connected: function() {
        console.log('oie');
      },

      received: function(newNotification) {
        this.setState({notifications: this.state.notifications.concat(newNotification)});
      }
    });

    this.getNotifications();
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
                {notification.topic} - {notification.actor}
              </div>
            );
          })
        }
        </div>
      </box>
    );
  }
}
