import React, { Component } from 'react';
import moment from 'moment'
import helper from '../components/Helper'

import NotificationsApi from '../api/NotificationsApi';

export default class NotificationList extends Component {
  constructor(){
    super();
    this.state = {notifications: [], page: 1, lastPage: false};
  }

  async getNotifications(e){
    if(e) e.preventDefault();

    try{
      let res = await NotificationsApi._index(this.state.page);
      let resJson = await res.json();

      this.setState({
        notifications: this.state.notifications.concat(resJson.notifications),
        lastPage: resJson.lastPage,
        page: 1 + this.state.page
      });

    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    this.getNotifications();
  }

  render(){
    return(
      <box>
        {
          this.state.notifications.length > 0 ?
            (
              <box>
                <div className="list-group">
                  {
                    this.state.notifications.map((notification)=>{
                      return(
                        <a href={notification.url} key={notification.id}
                        className={"list-group-item list-group-item-action" + (notification.readAt ? "" : "bgm-gray")}>
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
                {
                  !this.state.lastPage ?
                  (
                    <div className="row">
                      <div className="col-12 text-center">
                        <a href onClick={(e)=> this.getNotifications(e)}>
                          Carregar mais...
                        </a>
                      </div>
                    </div>
                  ) : null
                }
              </box>
            )
          :
            (
              <div className="row">
                <div className="col-12 text-center">
                  <span className="text-center text-muted">
                    Você não tem notificações
                  </span>
                </div>
              </div>
            )
        }
      </box>
    );
  }
}
