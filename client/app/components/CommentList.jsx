import React, { Component } from 'react';
import CommentsApi from '../api/CommentsApi';
import pubsub from 'pubsub-js'

import ReplyForm from './ReplyForm';

export default class CommentList extends Component {
  constructor(){
    super();
    this.state = {showReplyFormTo: null, unlimit: null};
    this.toggleReply = this.toggleReply.bind(this);
    this.unlimit = this.unlimit.bind(this);
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
      <div className="row panel comment-middle">
        <div className="col-12">
          <ul className="list-unstyled">
            {
              this.props.comments.map((comment)=>{
                return(
                  <li key={comment.id}>
                    <div className="row">
                      <div className="col-2 pr-0 mt-2">
                        <img src="assets/bidu.jpg" width="42px" className="rounded-circle" />
                      </div>
                      <div className="col pt-2">
                        <strong>Guilherme Zordan</strong>
                        <br/>
                        {this.limit = true}
                          {
                            comment.text.length <= 184 ?
                              (
                                <span className="comment-text">
                                  {comment.text}
                                </span>
                              )
                            :
                              this.state.unlimit === comment.id ?
                                (
                                  <span className="comment-text">
                                    {comment.text}
                                    <a href="#" className="float-right"
                                    onClick={(e) => this.unlimit(e, null)}>
                                      Recolher
                                    </a>
                                  </span>
                                )
                              :
                                (
                                  <span className="comment-text">
                                    {comment.text.substring(0,184)}
                                    <a href="#" className="float-right"
                                    onClick={(e) => this.unlimit(e, comment.id)}>
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
                          this.state.showReplyFormTo === comment.id ?
                          (<a href="#" onClick={(e) => this.toggleReply(e, null)}>Cancelar</a>) :
                          (<a href="#" onClick={(e) => this.toggleReply(e, comment.id)}>Responder</a>)
                        }
                      </div>
                    </div>
                    {
                      this.state.showReplyFormTo === comment.id ?
                        <div className="row">
                          <div className="col">
                            <ReplyForm commentId={comment.id} postId={this.props.postId} />
                          </div>
                        </div>
                      : null
                    }
                    <div className="row justify-content-end">
                    <div className="col-10">
                    <ul className="list-unstyled">
                    {
                      comment.replies.map((reply)=>{
                        return(
                          <li key={reply.id}>
                          <div className="row">
                          <div className="col-2 pr-0 mt-2">
                          <img src="assets/bidu.jpg" width="48px" className="rounded-circle" />
                          </div>
                          <div className="col pt-2">
                          <strong>Guilherme Zordan</strong>
                          <br/>
                          <span className="comment-text">
                          {reply.text}
                          </span>
                          </div>
                          </div>
                          <div className="row mt-2">
                          <div className="col text-right">
                          <i className="fa fa-arrow-up mr-2"></i>
                          <i className="fa fa-arrow-down mr-2"></i>
                          {
                            this.state.showReplyFormTo === comment.id ?
                            (<a href="#" onClick={(e) => this.toggleReply(e, '')}>Cancelar</a>) :
                            (<a href="#" onClick={(e) => this.toggleReply(e, comment.id)}>Responder</a>)
                          }
                          </div>
                          </div>
                          </li>
                        );
                      })
                    }
                    </ul>
                    </div>
                    </div>
                  </li>

                  );
                })
              }
            </ul>
          </div>
        </div>
    );
  }
}
