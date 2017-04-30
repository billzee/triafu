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
      } else if (resJson.errors){
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
    $(function (){
      $('[data-toggle="tooltip"]').tooltip({delay: {show: 1200}});
    });
  }

  render(){
    return (
      <div className="row no-gutters">
        <div className="col-8">
          <ul className="list-unstyled mb-0 bgm-gray p-3 rounded">
            <li className="text-center">
              <a className={"vote-link " + (this.state.userVote === 'funny' ? "voted" : "")} href="#"
              onClick={(e) => this.vote(e, 'funny')} data-toggle="tooltip" data-placement="left" data-title="Engraçado">
                <img src="/assets/funny.svg" width="35px" height="35px" />
              </a>
            </li>
            <li className="mt-3 text-center">
              <a className={"vote-link " + (this.state.userVote === 'smart' ? "voted" : "")} href="#"
              onClick={(e) => this.vote(e, 'smart')} data-toggle="tooltip" data-placement="left" data-title="Interessante">
                <img src="/assets/brain.svg" width="35px" height="35px"/>
              </a>
            </li>
            <li className="mt-3 text-center">
              <a className={"vote-link " + (this.state.userVote === 'negative' ? "voted" : "")} href="#"
              onClick={(e) => this.vote(e, 'negative')} data-toggle="tooltip" data-placement="left" data-title="Negativo">
                <img src="/assets/downvote.svg" width="30px" height="30px" />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <ul className="list-unstyled mb-0 pl-3 pt-3 pb-3">
            <li className="h-35 mt-2 text-success">
              {this.state.funnyCount}
            </li>
            <li className="mt-3 h-35 text-success">
              {this.state.smartCount}
            </li>
            <li className="mt-3 h-35 text-danger">
              {this.state.negativeCount}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
