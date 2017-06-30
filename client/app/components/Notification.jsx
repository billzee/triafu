import React, { Component } from 'react';

import NotificationsApi from '../api/NotificationsApi';

export default class Notification extends Component {
  constructor(){
    super();
    this.state = {notifications: []};

    this.buildActionPhrase = this.buildActionPhrase.bind(this);
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

  buildActionPhrase(topic){
    switch(topic) {
      case "comment":
        return "comentou a sua publicação"
        break;
      case "reply":
          return "respondeu ao seu comentário"
          break;
      case "post_vote":
          return "positivou sua publicação"
          break;
      case "reply_vote":
          return "positivou sua resposta"
          break;
      case "comment_vote":
          return "positivou seu comentário"
          break;
      default:
          break;
    }
  }

  render(){
    return (
      <box>
        <a href className="header-link" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
          <span className="fa-stack fa-15x has-badge">
            <i className="fa fa-bell fa-stack-1x"></i>
            <span className="counter">88</span>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-left mr-2">
        {
          this.state.notifications.map((notification)=>{
            return(
              <div className="dropdown-item"
              key={notification.id}>
                <a href={notification.url}>
                  {notification.actor} {this.buildActionPhrase(notification.topic)}
                </a>
              </div>
            );
          })
        }
        </div>
      </box>
    );
  }
}
