import React, { Component } from 'react';

import helper from '../components/Helper'
import pubsub from 'pubsub-js'

import TextArea from '../components/TextArea'
import CommentsApi from '../api/CommentsApi';

export default class ReplyForm extends Component {
  constructor(){
    super();
    this.state = {text: ''};
    this.reply = this.reply.bind(this);
  }

  async reply(e){
    e.preventDefault();

    try{
      let res = await CommentsApi._reply(this.props.postId, this.props.commentId, this.state);

      let resJson = await res.json();

      // pubsub.publish('comments', resJson);
      // this.setState({text: ''});
    } catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.reply} method="post">
        <TextArea value={this.state.text} onChange={helper.handleChange.bind(this, 'text')} placeholder="escreva uma resposta" />
        <ul className="list-unstyled list-inline float-right">
          <li className="list-inline-item">
            <input type="button" className="btn btn-secondary btn-sm" value=".gif"></input>
          </li>
          <li className="list-inline-item">
            <input type="submit" className="btn btn-success btn-sm" value="Responder"></input>
          </li>
        </ul>
      </form>
    );
  }
}
