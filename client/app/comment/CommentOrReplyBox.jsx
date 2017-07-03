import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import moment from 'moment'

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
      isReply: (props.isReply || false)
    };
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

  toggleReleaseText(e, commentId){
    e.preventDefault();
    this.setState(({release: commentId}));
  }

  render(){
    return (
      <box>
        <div className="row">
          <a href={"/usuario/" + this.props.commentOrReply.user.username} target="_blank">
            <img src={this.props.commentOrReply.user.image} width={this.props.photoSize}
            height={this.props.photoSize} className="rounded-circle ml-3 mt-1"/>
          </a>
          <div className="col pt-1 break-all">
            <a href={"/usuario/" + this.props.commentOrReply.user.username}
            target="_blank" className="black-hyperlink font-weight-bold">
              {this.props.commentOrReply.user.username}
            </a>
            {this.props.commentOrReply.user.id === this.props.postAuthor ? (<span className="text-success">&nbsp;autor</span>) : null}
            <br/>
            <small className="text-muted">&nbsp;{ moment(this.props.commentOrReply.createdAt).fromNow() }</small>
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
            <div className="row">
              <div className="col text-left">
                {
                  this.state.showReplyFormTo === this.props.commentOrReply.id ?
                  (<a href="#" onClick={(e) => this.toggleReply(e, null)}><small>Cancelar</small></a>) :
                  (<a href="#" onClick={(e) => this.toggleReply(e, this.props.commentOrReply.id)}><small>Responder</small></a>)
                }
                <CommentOrReplyVoteBox commentOrReply={this.props.commentOrReply} isComment={this.state.isComment} isReply={this.state.isReply} />
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
