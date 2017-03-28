import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import helper from '../components/Helper'
import TextArea from '../components/TextArea'

import CommentsApi from '../api/CommentsApi';

export default class CommentForm extends Component {
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
            <TextArea value={this.state.text} onChange={helper.handleChange.bind(this, 'text')} placeholder="escreva um comentário" />
          </form>
        </div>
      </div>
    );
  }
}
