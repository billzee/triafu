import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import VoteApi from '../api/VoteApi';

export default class CommentOrReplyVoteBox extends Component {
  constructor(props){
    super();
    this.state = {userVote: props.commentOrReply.userVote, points: props.commentOrReply.points};
  }

  updateUserVote(newVote){
    if(newVote !== this.state.userVote){
      let points;
      switch(newVote){
        case true:
          points = this.state.userVote === false ? 2 : 1
          this.setState({points: this.state.points + points});
          break;
        case false:
          points = this.state.userVote === true ? 2 : 1
          this.setState({points: this.state.points - points});
          break;
        case null:
          if(this.state.userVote === true){
            this.setState({points: this.state.points - 1});
          } else if(this.state.userVote === false){
            this.setState({points: this.state.points + 1});
          }
          break;
      }
    }

    this.setState({userVote: newVote});
  }

  async vote(vote){
    try{
      if(this.props.isComment){
        var commentVote = (vote === this.state.userVote) ? {vote: null} : {vote: vote};
        var res = await VoteApi._comment_create(this.props.commentOrReply.id, commentVote);
      } else if(this.props.isReply){
        var replyVote = (vote === this.state.userVote) ? {vote: null} : {vote: vote};
        var res = await VoteApi._reply_create(this.props.commentOrReply.id, replyVote);
      } else{return;}

      var resJson = await res.json();

      console.log(resJson);

      if(resJson.hasOwnProperty('vote')){
        this.updateUserVote(resJson.vote);
      } else if(resJson.errors){
        helper.authErrorDispatcher(resJson.errors);
      }

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <box className="ml-3">
        <i className={"fa fa-arrow-up mr-3 href " + (this.state.userVote === true ? "text-success" : "")} onClick={() => this.vote(true)}></i>
        <i className={"fa fa-arrow-down mr-3 href " + (this.state.userVote === false ? "text-danger" : "")} onClick={() => this.vote(false)}></i>
        <small className="text-muted"><strong>{this.state.points || 0}</strong> {helper.pluralize(this.state.points, "ponto")}&nbsp;</small>
      </box>
    );
  }
}
