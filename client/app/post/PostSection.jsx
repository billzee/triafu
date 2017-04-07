import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import Waypoint from 'react-waypoint';
import PostsApi from '../api/PostsApi';
import PostBox from './PostBox';

export default class PostSection extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [props], currentPost: ''};
  }

  componentDidMount(){
    pubsub
    .subscribe('view-post', (msg, data)=>{
      this.setState({currentPost: data});
    });
  }

  async componentWillMount(){
    if(this.state.posts.length === 0){
      try{
        let res = await PostsApi.index('/posts', {method: 'GET'});
        let resJson = await res.json();

        this.setState({posts: resJson});
      } catch(error){
        console.log(error);
      }
    }
  }

  render(){
    return (
      <box>
        {
          this.state.posts.map((post)=>{
            return(
              <Waypoint key={post.id}
                topOffset="45%"
                bottomOffset="45%"
                onEnter={(props)=> {
                  pubsub.publish('view-post', post.id);
                }}>
                <div>
                  <PostBox post={post} currentPost={this.state.currentPost}></PostBox>
                </div>
              </Waypoint>
            );
          })
        }
      </box>
    );
  }
}
