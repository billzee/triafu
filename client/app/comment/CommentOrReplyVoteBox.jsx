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

  updateUserVote(newVote){
    if(newVote !== this.state.userVote){
      switch(newVote){
        case true:
            this.setState({points: this.state.points + 1});
            break;
        case false:
            this.setState({points: this.state.points - 1});
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
      let commentOrReplyVote = (vote === this.state.userVote) ? {vote: null} : {vote: vote};

      let res = await VoteApi._comment_create(this.props.commentOrReply.id, commentOrReplyVote);
      let resJson = await res.json();

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

  async componentWillMount(){
    try{
      let res = await VoteApi._comment_index(this.props.commentOrReply.id);
      let resJson = await res.json();

      if(resJson.hasOwnProperty('vote')) this.setState({userVote: resJson.vote});
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <box>
        <i className={"fa fa-arrow-up mr-2 href " + (this.state.userVote === true ? "text-success" : "")} onClick={() => this.vote(true)}></i>
        <i className={"fa fa-arrow-down mr-2 href " + (this.state.userVote === false ? "text-danger" : "")} onClick={() => this.vote(false)}></i>
        <small className="text-muted"><strong>{this.state.points || 0}</strong> {helper.pluralize(this.state.points, "ponto")}&nbsp;</small>
      </box>
    );
  }
}
