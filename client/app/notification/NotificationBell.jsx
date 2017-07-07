import React, { Component } from 'react';
import moment from 'moment'
import helper from '../components/Helper'

import NotificationsApi from '../api/NotificationsApi';

export default class NotificationBell extends Component {
  constructor(){
    super();
    this.state = {notifications: [], totalUnread: 0};
  }

  async getNotifications(){
    try{
      let res = await NotificationsApi._bell();
      let resJson = await res.json();

      this.setState({notifications: resJson.notifications});
      this.setState({totalUnread: resJson.totalUnread});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    App.notifications = App.cable.subscriptions.create("NotificationChannel", {
      received: function(data) {
        let newNotification = JSON.parse(data);

        let newArray = this.state.notifications.slice();
        newArray.unshift(newNotification);
        this.setState({notifications: newArray});
        this.setState({totalUnread: this.state.totalUnread + 1});
      }.bind(this)
    });

    this.getNotifications();
  }

  async readNotifications(){
    try{
      let res = await NotificationsApi._read();
      let resJson = await res.json();

      this.setState({totalUnread: resJson.totalUnread});
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <box>
        <a href className="header-link" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false" onClick={()=> this.readNotifications()}>
          <span className="fa-stack">
            <i className="fa fa-bell"></i>
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
              <div className="dropdown-menu dropdown-menu-left notifications">
                <div className="notification-list">
                  {
                    this.state.notifications.map((notification)=>{
                      return(
                        <a className={"dropdown-item p-3 " + (notification.readAt ? "" : "bgm-gray")}
                        key={notification.id} href={notification.url}>
                          <div className="row no-gutters">
                            <img src={notification.image} height="42" width="42" className="align-self-center"/>
                            <div className="col pl-3">
                              <strong>
                                {notification.actor}&nbsp;
                              </strong>
                              {helper.buildNotificationBody(notification.topic)}
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
                  <a href="/notificacoes">
                    Ver todas notificações
                  </a>
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
