import React, { Component } from 'react';
import moment from 'moment'

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

  componentDidMount(){
    App.notifications = App.cable.subscriptions.create("NotificationChannel", {
      received: function(data) {
        console.log(data);
        let newNotification = JSON.parse(data);
        this.setState({notifications: this.state.notifications.concat(newNotification)});
        this.setState({totalUnread: this.state.totalUnread + 1});
      }.bind(this)
    });

    this.getNotifications();
  }

  buildActionPhrase(topic){
    switch(topic) {
      case "Comment":
        return "comentou a sua publicação"
        break;
      case "Reply":
        return "respondeu ao seu comentário"
        break;
      case "Funny":
        return "classificou sua publicação como engraçada"
        break;
      case "Smart":
        return "classificou sua publicação como interessante"
        break;
      case "ReplyVote":
        return "positivou sua resposta"
        break;
      case "CommentVote":
        return "positivou seu comentário"
        break;
      default:
        return "executou uma ação nesta publicação"
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
        {
          this.state.notifications.length > 0 ?
            (
              <div className="dropdown-menu dropdown-menu-left notifications mr-5">
                <div className="notification-list">
                  {
                    this.state.notifications.map((notification)=>{
                      return(
                        <a className="dropdown-item" key={notification.id} href={notification.url}>
                          <div className="row no-gutters">
                            <div className="text-center col-2">
                              <img src={notification.image} height="36" width="36"/>
                            </div>
                            <div className="col-10">
                              <strong>
                                {notification.actor}&nbsp;
                              </strong>
                              {this.buildActionPhrase(notification.topic)}
                              <br/>
                              <small className="text-muted">
                                { moment(notification.createdAt).fromNow() }
                              </small>
                            </div>
                          </div>
                        </a>
                      );
                    })
                  }
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-header text-center">
                  <a target="_blank" href="/notificacoes">Ver todas notificações</a>
                </div>
              </div>
            )
          :
            (
              <div className="dropdown-menu dropdown-menu-left notifications mr-5">
                <div className="dropdown-header text-center">
                  Você não tem notificações
                </div>
              </div>
            )
        }
      </box>
    );
  }
}
