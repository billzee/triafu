import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentOrReplyBox from '../comment/CommentOrReplyBox'

import RepliesApi from '../api/RepliesApi';

export default class ReplySection extends Component {
  constructor(props) {
    super();
    this.state = {replies: props.replies, page: 2, total_pages: null, commentId: '', postId: ''};
  }

  async getReplies(e){
    if(e) e.preventDefault();

    try{
      let res = await RepliesApi._get(this.props.postId, this.props.commentId, this.state.page);
      let resJson = await res.json();

      console.log(resJson);

      if(this.state.replies.length > 0){
        this.setState({replies: this.state.replies.concat(resJson.replies)});
      } else{
        this.setState({replies: resJson.replies});
      }

      this.setState({total_pages: resJson.total_pages});
      this.setState({page: 1 + this.state.page});
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
        <div className="row justify-content-end mt-2">
          <div className="col-11">
            <ul className="list-unstyled">
              {
                this.state.replies.map((reply)=>{
                  return(
                    <li key={reply.id}>
                      <CommentOrReplyBox photoSize={helper.replyPhotoSize} commentOrReply={reply} commentId={this.props.commentId} postId={this.props.postId} />
                    </li>
                  );
                })
              }
            </ul>
            {
              this.state.replies.length > 2 && !this.state.total_pages ?
              (
                <div className="row">
                  <div className="col text-right">
                    <a href="#" onClick={(e) => this.getReplies(e)}>
                      Carregar mais respostas
                    </a>
                  </div>
                </div>
              )
              : null
            }
            {
              this.state.page < this.state.total_pages ?
              (
                <div className="row">
                  <div className="col text-right">
                    <a href="#" onClick={(e) => this.getReplies(e)}>
                      Carregar mais respostas
                    </a>
                  </div>
                </div>
              )
              : null
            }
          </div>
        </div>
    );
  }
}
