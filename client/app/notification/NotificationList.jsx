import React, { Component } from 'react';
import moment from 'moment'
import helper from '../components/Helper'

import NotificationsApi from '../api/NotificationsApi';

export default class NotificationList extends Component {
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
      this.setState({totalUnread: resJson.totalUnread});
    } catch(error){
      console.log(error);
    }
  }

  async paginatePosts(e, category=(this.props.category || "top"), username=(this.props.username || "")){
    if(e) e.preventDefault();

    try{
      if(this.state.postReferenceId) this.setState({postReferenceId: null});

      let res = await PostsApi._index(this.state.page, category, username);
      let resJson = await res.json();

      var sortedPosts;
      if(this.state.sortBy){
        sortedPosts = resJson.posts.sort(
          function(a, b){
            return b[this.state.sortBy] - a[this.state.sortBy];
          }.bind(this)
        )
      }

      this.setState({
        posts: this.state.posts.concat(sortedPosts || resJson.posts),
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
            )
          :
            (
              "Você não tem notificações"
            )
        }
      </box>
    );
  }
}
