import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import PostsApi from '../api/PostsApi';
import PostBoxViewDesktop from './templates/PostBoxViewDesktop';

export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {post: props.post, points: props.post.points};
  }

  componentDidMount(){
    pubsub.subscribe('add-points', (msg, data)=>{
      if(this.state.post.id === data.postId) this.setState({points: this.state.points + data.points});
    });
    pubsub.subscribe('dim-points', (msg, data)=>{
      if(this.state.post.id === data.postId) this.setState({points: this.state.points - data.points});
    });
  }

  async vote(e, vote){
    if(e) e.preventDefault();

    let postVote = {vote: vote};

    try{
      let res = await PostsApi._vote(this.state.post.id, postVote);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.vote){
        switch(resJson.vote){
        case 'funny':
            this.setState({funnyCount: this.state.funnyCount + 1});
            break;
        case 'smart':
            this.setState({smartCount: this.state.smartCount + 1});
            break;
        case 'negative':
            this.setState({negativeCount: this.state.negativeCount + 1});
            break;
        }
      }

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <div>
        <PostBoxViewDesktop post={this.state.post} points={this.state.points}
        currentPost={this.props.currentPost}/>
      </div>
    );
  }
}
