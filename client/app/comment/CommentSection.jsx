import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentHeader from './CommentHeader';
import CommentForm from './CommentForm';
import CommentOrReplyBox from './CommentOrReplyBox'

import ReplySection from '../reply/ReplySection'

import CommentsApi from '../api/CommentsApi';
import RepliesApi from '../api/RepliesApi';

export default class CommentSection extends Component {
  constructor() {
    super();
    this.state = {comments: [], postId: '', page: 1, totalPages: '', totalCount: ''};
  }

  async getComments(e){
    if(e) e.preventDefault();

    try{
      let res = await CommentsApi._get(this.state.postId, this.state.page);
      let resJson = await res.json();

      if(this.state.comments.length > 0){
        this.setState({comments: this.state.comments.concat(resJson.comments)});
      } else{
        this.setState({comments: resJson.comments});
      }

      this.setState({totalCount: resJson.totalCount});
      this.setState({totalPages: resJson.totalPages});
      this.setState({page: 1 + this.state.page});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('view-post', (msg, data)=>{
      this.setState({postId: data});
      this.getComments();
    });

    pubsub
    .subscribe('comments', (msg, data)=>{
      this.setState({comments: data.comments});
      this.setState({totalPages: data.totalPages});
      this.setState({totalCount: data.totalCount});

      pubsub.publish('clear-comments-state', null);
    });
  }

  render(){
    return (
      <box>
        <CommentHeader totalCount={this.state.totalCount} />
        <div className="row panel comment-middle">
          <div className="col-12">
            <ul className="list-unstyled">
              {
                this.state.comments.map((comment, key)=>{
                  return(
                    <li key={comment.id}>
                      <CommentOrReplyBox photoSize={helper.commentPhotoSize} commentOrReply={comment} commentId={comment.id} postId={this.props.postId} />
                      {
                        comment.replies.length > 0 ?
                        (
                          <ReplySection commentId={comment.id} replies={comment.replies} />
                        )
                        : null
                      }
                      {
                        this.state.comments.length - 1 !== key ?
                        (<hr className="bgm-white" />)
                        : null
                      }
                    </li>
                  );
                })
              }
            </ul>
            {
              this.state.page < this.state.totalPages ?
              (
                <div className="row">
                  <div className="col text-right">
                    <a href="#" onClick={(e) => this.getComments(e)}>
                      Carregar mais comentários
                    </a>
                  </div>
                </div>
              )
              : null
            }
          </div>
        </div>
        <CommentForm postId={this.state.postId} />
      </box>
    );
  }
}
