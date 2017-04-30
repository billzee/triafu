import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentHeader from './CommentHeader';
import CommentForm from './CommentForm';
import CommentOrReplyBox from './CommentOrReplyBox'

import ReplySection from '../reply/ReplySection'

import CommentsApi from '../api/CommentsApi';

export default class CommentSection extends Component {
  constructor(props){
    super();
    this.state = {comments: [], postAuthor: props.userId, postId: props.postId, page: '', totalCount: 0, lastPage: true};
  }

  async getComments(){
    try{
      let res = await CommentsApi._get(this.state.postId);
      let resJson = await res.json();

      this.setState({
        comments: resJson.comments,
        totalCount: resJson.totalCount,
        lastPage: resJson.lastPage,
        page: 2
      });

    } catch(error){
      console.log(error);
    }
  }

  async paginateComments(e){
    if(e) e.preventDefault();

    try{
      let res = await CommentsApi._get(this.state.postId, this.state.page);
      let resJson = await res.json();

      this.setState({
        comments: this.state.comments.concat(resJson.comments),
        totalCount: resJson.totalCount,
        lastPage: resJson.lastPage,
        page: 1 + this.state.page
      });

    } catch(error){
      console.log(error);
    }
  }

  componentWillMount(){
    pubsub.subscribe('watch-post', (msg, data)=>{
      this.setState({postId: data.postId, postAuthor: data.postAuthor});
      this.getComments();
    });
  }

  componentDidMount(){
    pubsub.subscribe('submitted-comment', (msg, comment)=>{
      let newComments = this.state.comments.slice();
      newComments.unshift(comment);
      
      this.setState({
        comments: newComments,
        totalCount: this.state.totalCount + 1
      });

      console.log(this.state.comments);

      pubsub.publish('clear-comments-state', null);
    });
  }

  render(){
    return (
      <box>
        <CommentHeader totalCount={this.state.totalCount} />

        <div className="row panel pt-2 comment-middle">
          {
            this.state.comments.length > 0 ?
            (
              <div className="col-12">
                <ul className="list-unstyled">
                  {
                    this.state.comments.map((comment, key)=>{
                      return(
                        <li key={comment.id}>
                          <CommentOrReplyBox photoSize={helper.commentPhotoSize} commentOrReply={comment} isComment="true"
                          commentId={comment.id} postId={this.state.postId} postAuthor={this.state.postAuthor}/>

                          <ReplySection commentId={comment.id} replies={comment.replies || []}
                          hasMoreReplies={comment.hasMoreReplies || false} postAuthor={this.state.postAuthor}/>

                          {this.state.comments.length - 1 !== key ? (<hr className="bgm-white" />) : null}
                        </li>
                      );
                    })
                  }
                </ul>

                {
                  !this.state.lastPage ?
                  (
                    <div className="row mb-2">
                      <div className="col text-right">
                        <a href="#" onClick={(e) => this.paginateComments(e)}>
                          Carregar mais comentários
                        </a>
                      </div>
                    </div>
                  )
                  : null
                }
              </div>
            )
            : null
          }
        </div>

        <CommentForm postId={this.state.postId} />
      </box>
    );
  }
}
