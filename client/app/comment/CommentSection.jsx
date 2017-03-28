import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import CommentHeader from './CommentHeader';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

import CommentsApi from '../api/CommentsApi';

export default class CommentSection extends Component {
  constructor() {
    super();
    this.state = {comments: [], postId: ''};
  }

  async getComments(){
    try{
      let res = await CommentsApi.getAll(this.state.postId);
      let resJson = await res.json();

      this.setState({comments: resJson});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('comments', (msg, data)=>{
      this.setState({comments: data});
      pubsub.publish('clear-comments-state', null);
    });

    pubsub
    .subscribe('view-post', (msg, data)=>{
      this.setState({postId: data});
      this.getComments();
    });
  }

  render(){
    return (
      <box>
        <CommentHeader comments={this.state.comments} />
        <CommentList comments={this.state.comments} postId={this.state.postId} />
        <CommentForm postId={this.state.postId} />
      </box>
    );
  }
}
