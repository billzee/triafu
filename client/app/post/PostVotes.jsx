import React, { Component } from 'react';
import Moment from 'react-moment'
import pubsub from 'pubsub-js'

import PostsApi from '../api/PostsApi';

export default class PostBox extends Component {
  constructor(props) {
    super();
    this.state = {
      post: props.post,
      funnyCount: props.post.funnyCount,
      smartCount: props.post.smartCount,
      negativeCount: props.post.negativeCount
    };
  }

  async vote(e, vote){
    if(e) e.preventDefault();

    let postVote = {vote: vote};

    try{
      let res = await PostsApi._vote(this.state.post.id, postVote);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.vote){
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
              <a onClick={(e) => this.vote(e, 'funny')} href="#">
                <img src="/assets/funny.svg" width="35px" />
              </a>
            </li>
            <li className="mt-3 text-center">
              <a onClick={(e) => this.vote(e, 'smart')} href="#">
                <img src="/assets/brain.svg" width="35px"/>
              </a>
            </li>
            <li className="mt-4 text-center">
              <a onClick={(e) => this.vote(e, 'negative')} href="#">
                <img src="/assets/downvote.svg" width="30px" />
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
