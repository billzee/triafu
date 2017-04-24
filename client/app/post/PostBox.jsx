import React, { Component } from 'react';
import Moment from 'react-moment'
import pubsub from 'pubsub-js'

import PostShareLinks from './PostShareLinks';
import PostVotes from './PostVotes';

import PostsApi from '../api/PostsApi';

export default class PostBox extends Component {
  constructor(props) {
    super();
    this.state = {post: props.post};
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
      <div className="row justify-content-center mb-5 mt-4">
        <div className="col-700">
          <h1 className="col-550">{this.state.post.title}</h1>

          <div className="row no-gutters">
            <div className="col-550 p-0">
              <img src={this.state.post.media.image.url} className="post-image" />
            </div>

            <div className="col-100 p-0 ml-3 align-self-center">
              {
                this.state.post.id === this.props.currentPost ?
                (
                  <PostVotes post={this.state.post}/>
                )
                : null
              }
            </div>
          </div>

          <div className="col-550">
            <div className="row">
              <div className="col-6">
                <small className="text-muted">
                  {this.state.post.points || 0} {this.state.post.points === 1 ? "ponto" : "pontos"} <br/>
                  publicado <Moment fromNow>{this.state.post.createdAt}</Moment>
                </small>
              </div>
              <div className="col-6 mt-2">
                <PostShareLinks post={this.state.post} />
              </div>
            </div>

            <h3 className="text-center">
              { this.state.post.original ? (<a href={"//"+this.state.post.original} target="_blank">Link do autor original</a>) : null }
            </h3>

            <hr className="mt-2" />
          </div>

        </div>
      </div>
    );
  }
}
