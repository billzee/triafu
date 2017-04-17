import React, { Component } from 'react';

import helper from '../components/Helper'
import pubsub from 'pubsub-js'

import TextArea from '../components/TextArea'
import RepliesApi from '../api/RepliesApi';

export default class ReplyForm extends Component {
  constructor(){
    super();
    this.state = {text: ''};
    this.reply = this.reply.bind(this);
  }

  async reply(e){
    e.preventDefault();

    try{
      let res = await RepliesApi._create(this.props.commentId, this.state);

      let resJson = await res.json();

      this.setState({text: ''});
      pubsub.publish('submitted-reply', resJson);
    } catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.reply} method="post">

        <div className="input-group">
          <span className="input-group-btn">
            <button className="btn btn-sm btn-secondary">
              <i className="fa fa-smile-o"/>
            </button>
          </span>

          <TextArea value={this.state.text}
            onChange={helper.handleChange.bind(this, 'text')}
            style={{maxHeight: 100}}
            placeholder="escreva uma resposta" />

          <span className="input-group-btn">
            <input type="submit" className="btn btn-sm btn-success" value="Comentar"></input>
          </span>
        </div>

      </form>
    );
  }
}
