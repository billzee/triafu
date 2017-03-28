import React, { Component } from 'react';

import helper from '../components/Helper'
import TextArea from '../components/TextArea'
import CommentsApi from '../api/CommentsApi';
import pubsub from 'pubsub-js'

export default class ReplyForm extends Component {
  constructor(){
    super();
    this.state = {text: ''};
    this.reply = this.reply.bind(this);
  }

  async reply(e){
    e.preventDefault();

    try{
      let res = await CommentsApi.reply
        (
          this.props.postId,
          this.props.commentId,
          {
            text: this.state.text
          }
        );

      let resJson = await res.json();

      pubsub.publish('comments', resJson);
    } catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.reply} method="post">
        <TextArea value={this.state.text} onChange={helper.handleChange.bind(this, 'text')} placeholder="escreva uma resposta" />
      </form>
    );
  }
}
