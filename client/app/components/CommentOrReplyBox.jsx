import React, { Component } from 'react';
import Moment from 'react-moment'

import ReplyForm from './ReplyForm';

export default class CommentOrReplyBox extends Component {
  constructor(){
    super();
    this.state = {showReplyFormTo: null, unlimit: null};
    this.unlimit = this.unlimit.bind(this);
    this.toggleReply = this.toggleReply.bind(this);
  }

  toggleReply(e, commentId){
    e.preventDefault();
    this.setState(({showReplyFormTo: commentId}));
  }

  unlimit(e, commentId) {
    e.preventDefault();
    this.setState(({unlimit: commentId}));
  }

  render() {
    return (
      <box>
        <div className="row">
          <div width={this.props.photoSize} className="ml-3">
            <img src="assets/bidu.jpg" width={this.props.photoSize} className="rounded-circle" />
          </div>
          <div className="col pt-1">
            <strong>Guilherme Zordan </strong>
              <small className="text-muted">
                <Moment fromNow>{this.props.commentOrReply.created_at}</Moment>
              </small>
            <br/>
            {
              this.props.commentOrReply.text.length <= 184 ?
                (
                  <span className="comment-text">
                    {this.props.commentOrReply.text}
                  </span>
                )
              :
                this.state.unlimit === this.props.commentOrReply.id ?
                  (
                    <span className="comment-text">
                      {this.props.commentOrReply.text}
                      <a href="#" className="float-right"
                      onClick={(e) => this.unlimit(e, null)}>
                        Recolher
                      </a>
                    </span>
                  )
                :
                  (
                    <span className="comment-text">
                      {this.props.commentOrReply.text.substring(0,184)}
                      <a href="#" className="float-right"
                      onClick={(e) => this.unlimit(e, this.props.commentOrReply.id)}>
                        Ler mais...
                      </a>
                    </span>
                  )
              }
          </div>
        </div>
        <div className="row mt-2">
          <div className="col text-right">
            <i className="fa fa-arrow-up mr-2"></i>
            <i className="fa fa-arrow-down mr-2"></i>
            {
              this.state.showReplyFormTo === this.props.commentOrReply.id ?
              (<a href="#" onClick={(e) => this.toggleReply(e, null)}>Cancelar</a>) :
              (<a href="#" onClick={(e) => this.toggleReply(e, this.props.commentOrReply.id)}>Responder</a>)
            }
          </div>
        </div>
        {
          this.state.showReplyFormTo === this.props.commentOrReply.id ?
            <div className="row">
              <div className="col">
                <ReplyForm commentId={this.props.commentId} postId={this.props.postId} />
              </div>
            </div>
          : null
        }
      </box>
    );
  }
}
