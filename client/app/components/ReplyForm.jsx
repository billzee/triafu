import React, { Component } from 'react';
import helper from './Helper'
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
        <textarea value={this.state.text} onChange={helper.handleChange.bind(this, 'text')} className="form-control w-100"></textarea>
        <ul className="list-unstyled list-inline float-right">
          <li className="list-inline-item">
           <input type="button" className="btn btn-secondary btn-sm" value=".gif"></input>
          </li>
          <li className="list-inline-item">
           <input type="submit" className="btn btn-success btn-sm" value="Comentar"></input>
          </li>
       </ul>
      </form>
    );
  }
}
