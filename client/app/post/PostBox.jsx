import React, { Component } from 'react';
import Moment from 'react-moment'
import pubsub from 'pubsub-js'

import PostShareLinks from './PostShareLinks';

import PostsApi from '../api/PostsApi';

export default class PostBox extends Component {
  constructor(props) {
    super();
    this.state = {post: props.post};

    console.log(this.state);
  }

  async vote(e){
    if(e) e.preventDefault();

    try{
      let res = await PostsApi._vote(this.state.post.id);
      let resJson = await res.json();

      console.log(resJson);

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <div className="row justify-content-center mb-5 mt-4">
        <div className="col w-500 p-0">
          <h1>{this.state.post.title}</h1>

          <img src={this.state.post.media.image.url} className="post-image" />

          <div className="row no-gutters mt-1">
            <div className="col">
              <small className="text-muted">
                9986 pontos &bull; publicado <Moment fromNow>{this.state.post.created_at}</Moment>
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

        <div className="col w-150 p-0 ml-3">
          <div className="row no-gutters p-fixed">
            <div className="col-8">
              <ul className="list-unstyled bgm-gray p-3 rounded">
                <li className="text-center">
                  <a onClick={(e) => this.vote(e)} href="#"><img src="/assets/funny.svg" width="35px" /></a>
                </li>
                <li className="mt-3 text-center">
                  <a href="#"><img src="/assets/brain.svg" width="35px"/></a>
                </li>
                <li className="mt-4 text-center">
                  <a href="#"><img src="/assets/downvote.svg" width="35px" /></a>
                </li>
              </ul>
            </div>
            <div className="col-4">
              <ul className="list-unstyled p-3">
                <li className="h-35">
                  {this.state.post.funnyCount}
                </li>
                <li className="mt-3 h-35">
                  {this.state.post.smartCount}
                </li>
                <li className="mt-3 h-35">
                  {this.state.post.negativeCount}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
