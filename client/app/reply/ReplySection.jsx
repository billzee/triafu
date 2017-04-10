import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentOrReplyBox from '../comment/CommentOrReplyBox'

import RepliesApi from '../api/RepliesApi';

export default class ReplySection extends Component {
  constructor(props) {
    super();
    this.state = {replies: props.replies, page: 2, totalPages: null, commentId: props.commentId};
  }

  async getReplies(e){
    if(e) e.preventDefault();

    try{
      let res = await RepliesApi._get(this.state.commentId, this.state.page);
      let resJson = await res.json();

      if(this.state.replies.length > 0){
        this.setState({replies: this.state.replies.concat(resJson.replies)});
      } else{
        this.setState({replies: resJson.replies});
      }

      this.setState({totalPages: resJson.totalPages});
      this.setState({page: 1 + this.state.page});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('replies', (msg, data)=>{
      this.setState({replies: data.replies});
      this.setState({totalPages: data.totalPages});
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
                        <CommentOrReplyBox commentId={this.state.commentId} photoSize={helper.replyPhotoSize} commentOrReply={reply} />
                      </li>
                    );
                  })
                }
              </ul>
              {
                (this.state.replies.length > 2 && !this.state.totalPages) ||
                (this.state.page < this.state.totalPages) ?
                (
                  <div className="row">
                    <div className="col text-right">
                      <small>
                        <a href="#" onClick={(e) => this.getReplies(e)}>
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
