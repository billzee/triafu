import React, { Component } from 'react';

import NotificationsApi from '../api/NotificationsApi';

export default class Notification extends Component {
  constructor(){
    super();
    this.state = {notifications: [], totalUnread: 0};

    this.buildActionPhrase = this.buildActionPhrase.bind(this);
  }

  async getNotifications(){
    try{
      let res = await NotificationsApi._index();
      let resJson = await res.json();

      console.log(resJson);

      this.setState({notifications: resJson.notifications});
      this.setState({totalUnread: resJson.totalUnread});
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
            {
              this.state.totalUnread && this.state.totalUnread > 0 ?
              (
                <span className="counter">{this.state.totalUnread}</span>
              ) : null
            }
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-left notifications mr-5">
          {
            this.state.notifications.map((notification)=>{
              return(
                <a className="dropdown-item" key={notification.id}
                href={notification.url}>
                  <div className="row">
                    <div className="col-2">
                      <img src={notification.image} height="32" width="32"/>
                    </div>
                    <div className="col-10 align-self-center pl-1">
                      {notification.actor} {this.buildActionPhrase(notification.topic)}
                    </div>
                  </div>
                </a>
              );
            })
          }
          <div className="dropdown-divider"></div>
          <div className="dropdown-header text-center">
            <a target="_blank" href>Ver todas</a>
          </div>
        </div>
      </box>
    );
  }
}