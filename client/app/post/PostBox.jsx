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
        <div className="col-500 p-0">
          <h1>{this.state.post.title}</h1>

          <img src={this.state.post.media.image.url} className="post-image" />

          <div className="row no-gutters mt-1">
            <div className="col">
              <small className="text-muted">
                {this.state.post.points || 0} {this.state.post.points === 1 ? "ponto" : "pontos"} &bull; publicado <Moment fromNow>{this.state.post.created_at}</Moment>
                <span className="float-right">Compartilhar</span>
              </small>
            </div>
          </div>

          <div className="row no-gutters">
            <div className="col">
              <h3 className="mt-1">
                {
                  this.state.post.original ?
                  (
                    <a href={"//"+this.state.post.original} target="_blank">
                      Link do autor original
                    </a>
                  )
                  : null
                }
              </h3>
            </div>
            <PostShareLinks post={this.state.post} />
          </div>

          <hr className="mt-2" />
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
    );
  }
}
