import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import Moment from 'react-moment'
import PostsApi from '../api/PostsApi';
import pubsub from 'pubsub-js'

export default class PostSection extends Component {
  constructor(props, _railsContext) {
    super(props);
    console.log(props);

    this.state = {posts: []};
  }

  async componentWillMount(){
    try{
      let res = await PostsApi.index('/posts', {method: 'GET'});
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
              <div key={post.id} className="row justify-content-center mb-5 mt-4">
                <div className="col col-500 p-0">
                  <h1>
                    {post.title}
                  </h1>

                  <img src={post.media.image.url} className="post-image" />

                  <Waypoint onEnter={(props)=> {
                    pubsub.publish('view-post', post.id);
                  }}>
                    <div className="waypoint-anchor"></div>
                  </Waypoint>

                  <div className="row mt-2">
                    <div className="col-6">
                      <span className="text-muted">
                        publicado <Moment fromNow>{post.created_at}</Moment>
                      </span>
                    </div>
                    <div className="col-6 text-right">
                      <ul className="list-unstyled list-inline">
                        <li className="list-inline-item">
                          <button className="btn btn-primary">
                            <i className="fa fa-facebook-f fa-1x"></i>
                            <span className="ml-2">Facebook</span>
                          </button>
                        </li>
                        <li className="list-inline-item">
                          <button className="btn btn-secondary">
                            <i className="fa fa-twitter fa-1x"></i>
                            <span className="ml-2">Twitter</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr />
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
