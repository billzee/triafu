import React, { Component } from 'react';
// import Moment from 'react-moment'
import pubsub from 'pubsub-js'

import PostShareLinks from './PostShareLinks';
import PostMedia from './PostMedia';
import PostVoteBox from './PostVoteBox';

import helper from '../components/Helper'

import PostsApi from '../api/PostsApi';

export default class PostBox extends Component {
  constructor(props){
    super();
    this.state = {post: props.post, points: props.post.points};
  }

  componentDidMount(){
    console.log(this.state.post);
    pubsub.subscribe('add-points', (msg, data)=>{
      if(this.state.post.id === data.postId) this.setState({points: this.state.points + data.points});
    });
    pubsub.subscribe('dim-points', (msg, data)=>{
      if(this.state.post.id === data.postId) this.setState({points: this.state.points - data.points});
    });
  }

  async vote(e, vote){
    if(e) e.preventDefault();

    let postVote = {vote: vote};

    try{
      let res = await PostsApi._vote(this.state.post.id, postVote);
      let resJson = await res.json();

      console.log(resJson);

      if(resJson.vote){
        switch(resJson.vote){
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
            { this.state.post.original ?
              (
                <h4>
                  <a href={"//"+this.state.post.original} target="_blank">
                    Link do autor original
                  </a>
                </h4>
              )
              : null
            }

          <div className="row no-gutters">
            <div className="col-550 p-0">
              <PostMedia imageUrl={this.state.post.image.url} videoUrl={this.state.post.video.url} postId={this.state.post.id} />
            </div>

            <div className="col-100 p-0 ml-3 align-self-center">
              {
                this.state.post.id === this.props.currentPost ?
                (
                  <PostVoteBox post={this.state.post}/>
                )
                : null
              }
            </div>
          </div>

          <div className="col-550">
            <div className="row">
              <div className="col-6">
                <small className="text-muted">
                  {this.state.points || 0} {helper.pluralize(this.state.points, "ponto")}<br/>
                  {
                    // Publicado <Moment fromNow>{this.state.post.createdAt}</Moment>
                  }
                </small>
              </div>
              <div className="col-6 mt-2">
                <PostShareLinks post={this.state.post} />
              </div>
            </div>

            <hr className="mt-2" />
          </div>

        </div>
      </div>
    );
  }
}
