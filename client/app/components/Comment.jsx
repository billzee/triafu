import React, { Component } from 'react';
import helper from './Helper'
import CommentsApi from '../api/CommentsApi';
import pubsub from 'pubsub-js'

import CommentList from './CommentList';

import {IntlProvider, FormattedMessage} from 'react-intl';

export default class CommentBox extends Component {
  constructor() {
    super();
    this.state = {comments: [], postId: ''};
  }

  async getComments(){
    try{
      let res = await CommentsApi.getAll(this.state.postId);
      let resJson = await res.json();
      
      this.setState({comments: resJson});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('comments', (msg, data)=>{
      this.setState({comments: data});
    });

    pubsub
    .subscribe('view-post', (msg, data)=>{
      this.setState({postId: data});
      this.getComments();
    });
  }

  render(){
    return (
      <box>
        <CommentCounter comments={this.state.comments} />
        <CommentList comments={this.state.comments} postId={this.state.postId} />
        <CommentForm postId={this.state.postId} />
      </box>
    );
  }
}

class CommentCounter extends Component {
  render(){
    return(
      <div className="row comment-top">
        <div className="col">
          <strong>
            {this.props.comments.length} comentários
          </strong>
        </div>
      </div>
    );
  }
}

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {text: ''};
    this.comment = this.comment.bind(this);
  }

  async comment(e){
    e.preventDefault();

    try{
      let res = await CommentsApi.comment(this.props.postId, this.state);
      let resJson = await res.json();

      console.log('resposta', resJson);

      pubsub.publish('comments', resJson);
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <div className="row bt-white comment-bottom">
        <div className="col">
          <form onSubmit={this.comment} method="post" className="form">
            <textarea value={this.state.text} onChange={helper.handleChange.bind(this, 'text')}
            placeholder="escreva um comentário" className="form-control w-100 mb-2"></textarea>
             <ul className="list-unstyled list-inline float-right">
               <li className="list-inline-item">
                <input type="button" className="btn btn-secondary btn-sm" value=".gif"></input>
               </li>
               <li className="list-inline-item">
                <input type="submit" className="btn btn-success btn-sm" value="Comentar"></input>
               </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
