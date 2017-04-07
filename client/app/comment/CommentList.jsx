import React, { Component } from 'react';

import CommentsApi from '../api/CommentsApi';
import helper from '../components/Helper'
import CommentOrReplyBox from './CommentOrReplyBox'

export default class CommentList extends Component {

  render() {
    return (
      <div className="row panel comment-middle">
        <div className="col-12">
          <ul className="list-unstyled">
            {
              this.props.comments.map((comment, key)=>{
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
                      this.props.comments.length - 1 !== key ?
                      (<hr className="bgm-white" />)
                      : null
                    }
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
