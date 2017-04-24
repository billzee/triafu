import React, { Component } from 'react';
import Moment from 'react-moment'
import pubsub from 'pubsub-js'

import PostsApi from '../api/PostsApi';

export default class PostBox extends Component {
  constructor(props) {
    super();
    this.state = {
      userVote: props.post.userVote,
      funnyCount: props.post.funnyCount,
      smartCount: props.post.smartCount,
      negativeCount: props.post.negativeCount
    };
  }

  componentDidMount(){
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({delay: {show: 800}})
    })
  }

  async vote(e, vote){
    if(e) e.preventDefault();

    let postVote = {vote: vote};

    try{
      let res = await PostsApi._vote(this.props.post.id, postVote);
      let resJson = await res.json();

      if(resJson.vote !== this.state.userVote){
        switch(this.state.userVote) {
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
      }

      if(resJson.vote){
        this.setState({userVote: resJson.vote});

        switch(resJson.vote) {
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
      <div className="row no-gutters p-fixed">
        <div className="col-8">
          <ul className="list-unstyled bgm-gray p-3 rounded">
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
                <img src="/assets/downvote.svg" width="35px" height="35px" />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <ul className="list-unstyled p-3">
            <li className="h-35">
              {this.state.funnyCount}
            </li>
            <li className="mt-3 h-35">
              {this.state.smartCount}
            </li>
            <li className="mt-3 h-35">
              {this.state.negativeCount}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
