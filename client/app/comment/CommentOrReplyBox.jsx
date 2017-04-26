import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import Moment from 'react-moment'

import helper from '../components/Helper';

import ReplyForm from '../reply/ReplyForm';

import CommentOrReplyVoteBox from './CommentOrReplyVoteBox';

export default class CommentOrReplyBox extends Component {
  constructor(props){
    super();
    this.state = {
      showReplyFormTo: null,
      release: null,
      isComment: (props.isComment || false),
      isReply: (props.isReply || false)};
  }

  componentDidMount(){
    pubsub.subscribe('clear-comments-state', ()=>{
      this.setState({showReplyFormTo: null, release: null});
    });
  }

  toggleReply(e, commentId){
    e.preventDefault();
    this.setState(({showReplyFormTo: commentId}));
  }

  toggleReleaseText(e, commentId) {
    e.preventDefault();
    this.setState(({release: commentId}));
  }

  render() {
    return (
      <box>
        <div className="row">
          <div width={this.props.photoSize} className="ml-3">
            <img src="/assets/bidu.jpg" width={this.props.photoSize} className="rounded-circle" />
          </div>
          <div className="col pt-1">
            <strong>
              {this.props.commentOrReply.user.username}
              {this.props.commentOrReply.user.id === this.props.postAuthor ? (<span className="text-success">&nbsp;autor</span>) : null}
            </strong>
            <small className="text-muted">&nbsp;<Moment fromNow>{this.props.commentOrReply.createdAt}</Moment></small>
            <br/>
            {
              this.props.commentOrReply.text.length <= helper.maxLengthForRelease ?
                (
                  <span className="comment-text">
                    {this.props.commentOrReply.text}
                  </span>
                )
              : this.state.release === this.props.commentOrReply.id ?
                (
                  <span className="comment-text">
                    {this.props.commentOrReply.text}
                  </span>
                )
              :
                (
                  <span className="comment-text">
                    {this.props.commentOrReply.text.substring(0,helper.maxLengthForRelease)}...
                  </span>
                )
            }
            <div className="row">
              <div className="col-8 text-left">
                <CommentOrReplyVoteBox commentOrReply={this.props.commentOrReply} isComment={this.state.isComment} isReply={this.state.isReply} />
                {
                  this.state.showReplyFormTo === this.props.commentOrReply.id ?
                  (<a href="#" onClick={(e) => this.toggleReply(e, null)}><small>Cancelar</small></a>) :
                  (<a href="#" onClick={(e) => this.toggleReply(e, this.props.commentOrReply.id)}><small>Responder</small></a>)
                }
              </div>

              <div className="col-4 text-right">
                {
                  this.props.commentOrReply.text.length > helper.maxLengthForRelease ?
                    this.state.release === this.props.commentOrReply.id ?
                      (
                        <a href="#" className="float-right"
                        onClick={(e) => this.toggleReleaseText(e, null)}>
                          <small>Recolher</small>
                        </a>
                      )
                    :
                      (
                        <a href="#" className="float-right"
                        onClick={(e) => this.toggleReleaseText(e, this.props.commentOrReply.id)}>
                          <small>Ler mais</small>
                        </a>
                      )
                  : null
                }
              </div>
            </div>
          </div>
        </div>
        {
          this.state.showReplyFormTo === this.props.commentOrReply.id ?
          (
            <div className="row">
              <div className="col">
                <ReplyForm commentId={this.props.commentId} />
              </div>
            </div>
          )
          : null
        }
      </box>
    );
  }
}
