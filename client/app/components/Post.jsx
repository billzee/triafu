import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import PostsApi from '../api/PostsApi';
import pubsub from 'pubsub-js'

export default class PostBox extends Component {
  constructor() {
    super();
    this.state = {posts: []};
  }

  async componentWillMount(){
    try{
      let res = await PostsApi.getAll('/posts', {method: 'GET'});
      let resJson = await res.json();

      this.setState({posts: resJson});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('posts', (msg, data)=>{
      this.setState({posts: data});
    });
  }

  render(){
    return (
      <box>
        {
          this.state.posts.map((post)=>{
            return(
              <div key={post.id} className="row justify-content-md-center mb-5 mt-4">
                <div className="col col-md-auto">
                  <h1>
                    {post.title}
                  </h1>
                    <div className="center">
                      <img src={post.image.url} className="post-image" />
                      <Waypoint onEnter={(props)=> {
                        pubsub.publish('view-post', post.id);
                      }}>
                        <div className="waypoint-anchor"></div>
                      </Waypoint>
                    </div>
                </div>
              </div>
            );
          })
        }
      </box>
    );
  }
}

// <div className="col col-2 align-self-center pt-5">
// <div className="row no-gutters">
// <div className="col-8">
// <ul className="list-unstyled bg-gray p-3 rounded">
// <li>
// <a>aaa</a>
// </li>
// <li>
// <a>aaa</a>
// </li>
// <li>
// <a>aaa</a>
// </li>
// </ul>
// </div>
// <div className="col-4">
// <ul className="list-unstyled p-3">
// <li>
// 12
// </li>
// <li>
// 12
// </li>
// <li>
// 12
// </li>
// </ul>
// </div>
// </div>
// </div>
