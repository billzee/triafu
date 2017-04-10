import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentHeader from './CommentHeader';
import CommentForm from './CommentForm';
import CommentOrReplyBox from './CommentOrReplyBox'

import CommentsApi from '../api/CommentsApi';

export default class CommentSection extends Component {
  constructor() {
    super();
    this.state = {comments: [], page: 1, postId: ''};
  }

  async getComments(e){
    if(e) e.preventDefault();

    try{
      let res = await CommentsApi._get(this.state.postId, this.state.page);
      let resJson = await res.json();

      console.log(resJson);

      console.log(resJson.comments);

      if(this.state.comments.length > 0){
        this.setState({comments: this.state.comments.concat(resJson)});
      } else{
        this.setState({comments: resJson});
      }

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
      this.setState({comments: data});
      pubsub.publish('clear-comments-state', null);
    });
  }

  render(){
    return (
      <box>
        <CommentHeader comments={this.state.comments} />
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
                          <div className="row justify-content-end mt-2">
                            <div className="col-11">
                              <ul className="list-unstyled">
                                {
                                  comment.replies.map((reply)=>{
                                    return(
                                      <li key={reply.id}>
                                        <CommentOrReplyBox photoSize={helper.replyPhotoSize} commentOrReply={reply} commentId={comment.id} postId={this.props.postId} />
                                      </li>
                                    );
                                  })
                                }
                              </ul>
                            </div>
                          </div>
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

            <div className="row">
              <div className="col text-right">
                <a href="#" onClick={(e) => this.getComments(e)}>
                  Carregar mais comentários
                </a>
              </div>
            </div>

          </div>
        </div>
        <CommentForm postId={this.state.postId} />
      </box>
    );
  }
}
