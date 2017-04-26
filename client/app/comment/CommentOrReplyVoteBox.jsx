import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import VoteApi from '../api/VoteApi';

export default class CommentOrReplyVoteBox extends Component {
  constructor(props){
    super();
    this.state = {
      userVote: props.commentOrReply.userVote,
      points: props.commentOrReply.points
    };
  }

  async voteComment(comment, vote){

  }

  async vote(vote){
    try{
      let commentOrReplyVote = (vote === this.state.userVote) ? {vote: null} : {vote: vote};

      let res = await VoteApi._comment_create(this.props.commentOrReply.id, commentOrReplyVote);
      let resJson = await res.json();

      console.log(resJson);

      // if (resJson.vote || resJson.vote === null){
      //   this.updateUserVote(resJson.vote);
      // } else if (resJson.errors){
      //   helper.authErrorDispatcher(resJson.errors);
      // }

    } catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <box>
        <i className="fa fa-arrow-up mr-2 href" onClick={() => this.vote(true)}></i>
        <i className="fa fa-arrow-down mr-2 href" onClick={() => this.vote(false)}></i>
      </box>
    );
  }
}
