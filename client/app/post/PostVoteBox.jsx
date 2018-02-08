import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import VoteApi from '../api/VoteApi';

export default class PostVoteBox extends Component {
  constructor(props){
    super();
    this.state = {
      userVote: props.post.userVote,
      funnyCount: props.post.funnyCount,
      smartCount: props.post.smartCount,
      negativeCount: props.post.negativeCount
    };
  }

  updateUserVote(newVote){
    if(newVote !== this.state.userVote){
      switch(this.state.userVote){
        case 'funny':
          this.setState({funnyCount: this.state.funnyCount - 1});
          break;
        case 'smart':
          this.setState({smartCount: this.state.smartCount - 1});
          break;
        case 'negative':
          this.setState({negativeCount: this.state.negativeCount - 1});
          break;
      }

      switch(newVote){
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

    this.setState({userVote: newVote});
  }

  async vote(e, vote){
    if(e) e.preventDefault();

    let postVote = (vote === this.state.userVote) ? {vote: null} : {vote: vote};

    try{
      let res = await VoteApi._post_create(this.props.post.id, postVote);
      let resJson = await res.json();

      if (resJson.hasOwnProperty('vote')){
        switch(resJson.vote){
          case 'funny':
            if(this.state.userVote === 'negative'){
              pubsub.publish('add-points', {postId: this.props.post.id, points: 2});
            }else if(this.state.userVote !== 'smart'){
              pubsub.publish('add-points', {postId: this.props.post.id, points: 1});
            }
            break;
          case 'smart':
            if(this.state.userVote === 'negative'){
              pubsub.publish('add-points', {postId: this.props.post.id, points: 2});
            }else if(this.state.userVote !== 'funny'){
              pubsub.publish('add-points', {postId: this.props.post.id, points: 1});
            }
            break;
          case 'negative':
            if(this.state.userVote === 'funny' || this.state.userVote === 'smart'){
              pubsub.publish('dim-points', {postId: this.props.post.id, points: 2});
            }else{
              pubsub.publish('dim-points', {postId: this.props.post.id, points: 1});
            }
            break;
          case null:
            if (this.state.userVote === 'negative'){
              pubsub.publish('add-points', {postId: this.props.post.id, points: 1});
            } else{
              pubsub.publish('dim-points', {postId: this.props.post.id, points: 1});
            }
            break;
        }

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
      let res = await VoteApi._post_index(this.props.post.id);
      let resJson = await res.json();

      if(resJson.hasOwnProperty('vote')) this.updateUserVote(resJson.vote);
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    $(function(){ $('[data-toggle="tooltip"]').tooltip({delay: {show: 1200}}); });
  }

  render(){
    return(
      <div className="row no-gutters bgm-gray p-2 rounded">
        <div className="col-4 text-center">
          <i className={"vote-link href " + (this.state.userVote === 'funny' ? "voted" : "")} href data-placement="top"
          onClick={(e) => this.vote(e, 'funny')} data-toggle="tooltip" data-placement="bottom" data-title="Engraçado">
            <img src="/assets/icons/funny.svg" width="35px" height="35px" />
          </i>
          <span className="ml-2 text-success">
            {this.state.funnyCount}
          </span>
        </div>
        <div className="col-4 text-center">
          <i className={"vote-link href " + (this.state.userVote === 'smart' ? "voted" : "")} href data-placement="top"
          onClick={(e) => this.vote(e, 'smart')} data-toggle="tooltip" data-placement="bottom" data-title="Interessante">
            <img src="/assets/icons/brain.svg" width="35px" height="35px"/>
          </i>
          <span className="ml-2 text-success">
            {this.state.smartCount}
          </span>
        </div>
        <div className="col-4 text-center pt-1">
          <i className={"vote-link " + (this.state.userVote === 'negative' ? "voted" : "")} href data-placement="top"
          onClick={(e) => this.vote(e, 'negative')} data-toggle="tooltip" data-placement="bottom" data-title="Negativo">
            <img src="/assets/icons/downvote.svg" width="28px" height="28px" />
          </i>
          <span className="ml-2 text-danger">
            {this.state.negativeCount}
          </span>
        </div>
      </div>
    );
  }
}
