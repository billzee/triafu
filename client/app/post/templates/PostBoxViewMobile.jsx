import React, { Component } from 'react';
import helper from '../../components/Helper'
import moment from 'moment'
import pubsub from 'pubsub-js'

import PostMedia from '../PostMedia';
import PostShareLinks from '../PostShareLinks';
import PostVoteBox from '../PostVoteBox';

export default class PostBoxViewMobile extends Component {
  constructor(props){
    super();
    this.state = {commentCount: props.post.commentCount};
  }

  forcePostWatch(){
    pubsub.publish('share-links-for', this.props.post.referenceId);
    pubsub.publish('watch-post', {postId: this.props.post.id, postAuthor: this.props.post.userId});
  }

  showComments(){
    this.forcePostWatch();
    helper.toggleComments();
  }

  showShareLinks(){
    this.forcePostWatch();
    helper.toggleShareLinks();
  }

  componentDidMount(){
    pubsub.subscribe('submitted-comment', ()=>{
      this.setState({commentCount: this.state.commentCount + 1});
    });
  }

  render(){
    return (
      <box>
        <div className="row justify-content-center mb-2 mt-4 no-gutters">
          <div className="col-12 text-center mw-550 p-0">
            <h1 className="text-left pl-1 pr-1">
              {this.props.post.title}
            </h1>
            { this.props.post.original ?
              (
                <h4 className="text-left pl-1 pr-1">
                  <a href={this.props.post.original}
                  target="_blank" content="noindex, nofollow">
                    link do autor original
                  </a>
                </h4>
              )
              : null }

            <PostMedia
            image={this.props.post.image}
            video={this.props.post.video}
            postId={this.props.post.id} />

            <div className="row mt-1 no-gutters pl-1 pr-1">
              <div className="col-2 align-self-center pr-0">
                &nbsp;
                <button className="btn btn-block btn-secondary p-2" onClick={()=> this.showShareLinks()}>
                  <i className="fa fa-share-alt"></i>
                </button>
              </div>

              <div className="col-8 text-center pr-1 pl-1">
                <small className="text-muted">
                  {this.props.points || 0}&nbsp;&bull;&nbsp;{moment(this.props.post.createdAt).fromNow()}
                </small>

                <PostVoteBox post={this.props.post} isMobile="true" />
              </div>

              <div className="col-2 align-self-center text-center pl-0">
                <span className="text-muted">
                  {this.state.commentCount || 0}
                </span>
                <button className="btn btn-block btn-secondary p-2" onClick={()=> this.showComments()}>
                  <i className="fa fa-comments"></i>
                </button>
              </div>
            </div>

            <hr className="mt-3" />
          </div>
        </div>

      </box>
    );
  }
}
