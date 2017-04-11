import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentHeader from './CommentHeader';
import CommentForm from './CommentForm';
import CommentOrReplyBox from './CommentOrReplyBox'

import ReplySection from '../reply/ReplySection'

import CommentsApi from '../api/CommentsApi';

export default class CommentSection extends Component {
  constructor() {
    super();
    this.state = {comments: [], postId: '', page: '', totalCount: '', lastPage: true};
  }

  async getComments(e){
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
    pubsub
    .subscribe('view-post', (msg, data)=>{
      this.setState({postId: data});
      this.getComments();
    });
  }

  componentDidMount(){
    pubsub
    .subscribe('submitted-comment', (msg, data)=>{
      this.setState({
        comments: data.comments,
        lastPage: data.lastPage,
        totalCount: data.totalCount
      });

      pubsub.publish('clear-comments-state', null);
    });
  }

  render(){
    return (
      <box>

        <CommentHeader totalCount={this.state.totalCount} />

        <div className="row panel pt-2 comment-middle">
          <div className="col-12">

            <ul className="list-unstyled">
              {
                this.state.comments.map((comment, key)=>{
                  return(
                    <li key={comment.id}>
                      <CommentOrReplyBox photoSize={helper.commentPhotoSize} commentOrReply={comment} commentId={comment.id} postId={this.props.postId} />
                      <ReplySection commentId={comment.id} replies={comment.replies} hasMoreReplies={comment.hasMoreReplies}/>
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
              !this.state.lastPage ?
              (
                <div className="row">
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
        </div>

        <CommentForm postId={this.state.postId} />

      </box>
    );
  }
}
