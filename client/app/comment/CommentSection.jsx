import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentHeader from './CommentHeader';
import CommentOrReplyBox from './CommentOrReplyBox'

import ReplySection from '../reply/ReplySection'

import CommentsApi from '../api/CommentsApi';

export default class CommentSection extends Component {
  constructor(props){
    super();
    this.state = {
      comments: [],
      postAuthor: props.userId,
      postId: props.postId,
      isMobile: (props.isMobile || false),
      page: '',
      totalCount: 0,
      lastPage: true,
      loading: false
    };
  }

  async getComments(){
    if(this.state.loading) return;
    this.setState({loading: true});

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

    this.setState({loading: false});
  }

  async paginateComments(e){
    if(e) e.preventDefault();
    if(this.state.loading) return;
    this.setState({loading: true});

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

    this.setState({loading: false});
  }

  componentWillMount(){
    pubsub.subscribe('watch-post', (msg, data)=>{
      this.setState({postId: data.postId, postAuthor: data.postAuthor});
      this.setState({comments: []});
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

      this.commentScroll.scrollTop = 0;
      pubsub.publish('clear-comments-state');
    });
  }

  render(){
    return (
      <box>
        <CommentHeader totalCount={this.state.totalCount} isMobile={this.state.isMobile} postId={this.state.postId}/>

        <div className="row pt-2 pb-2 comment-list" ref={(div) => {this.commentScroll = div}}>
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
            : this.state.loading === true ?
              (
                <div className="col align-self-center text-center text-purple">
                  <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                </div>
              ) : null
          }
        </div>
      </box>
    );
  }
}
