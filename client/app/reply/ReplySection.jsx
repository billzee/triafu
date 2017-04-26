import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentOrReplyBox from '../comment/CommentOrReplyBox'

import RepliesApi from '../api/RepliesApi';

export default class ReplySection extends Component {
  constructor(props) {
    super();
    this.state = {replies: props.replies, page: 1, lastPage: false};
  }

  async paginateReplies(e){
    if(e) e.preventDefault();

    try{
      let res = await RepliesApi._get(this.props.commentId, this.state.page);
      let resJson = await res.json();

      if(this.state.page === 1){
        this.setState({replies: resJson.replies});
      } else{
        this.setState({replies: this.state.replies.concat(resJson.replies)});
      }

      this.setState({
        lastPage: resJson.lastPage,
        page: 1 + this.state.page
      });
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('submitted-reply', (msg, data)=>{
      if(data.commentId === this.props.commentId){
        this.setState({
          replies: data.replies,
          lastPage: data.lastPage
        });
      }
    });
  }

  render(){
    return (
      <box>
      {
        this.state.replies.length > 0 ?
        (
          <div className="row justify-content-end mt-2">
            <div className="col-11">
              <ul className="list-unstyled">
                {
                  this.state.replies.map((reply)=>{
                    return(
                      <li key={reply.id}>
                        <CommentOrReplyBox commentId={this.state.commentId} photoSize={helper.replyPhotoSize}
                        commentOrReply={reply} postAuthor={this.props.postAuthor} isReply="true"/>
                      </li>
                    );
                  })
                }
              </ul>
              {
                this.props.hasMoreReplies && !this.state.lastPage ?
                (
                  <div className="row">
                    <div className="col text-right">
                      <small>
                        <a href="#" onClick={(e) => this.paginateReplies(e)}>
                          Carregar mais respostas
                        </a>
                      </small>
                    </div>
                  </div>
                )
                : null
              }
            </div>
          </div>
        )
        : null
      }
      </box>
    );
  }
}
