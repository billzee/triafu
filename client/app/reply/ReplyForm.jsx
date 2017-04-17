import React, { Component } from 'react';

import helper from '../components/Helper'
import pubsub from 'pubsub-js'

import TextAreaAutosize from '../components/TextAreaAutosize'
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

      if(resJson.errors){
        this.setState({errors: resJson.errors});
      }else {
        this.setState({text: ''});
        pubsub.publish('submitted-reply', resJson);
      }

    } catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.reply} method="post">

        <div className={"input-group " + (this.state.errors ? "has-danger" : "")}>
          <span className="input-group-btn">
            <button type="button" className="btn btn-sm btn-secondary">
              <i className="fa fa-smile-o"/>
            </button>
          </span>

          <TextAreaAutosize
            value={this.state.text}
            onChange={helper.handleChange.bind(this, 'text')}
            style={{maxHeight: 50}}
            placeholder="escreva uma resposta" />

          <span className="input-group-btn">
            <input type="submit" className="btn btn-sm btn-success" value="Responder"></input>
          </span>
        </div>

        <small className="form-control-feedback text-danger">{this.state.errors ? this.state.errors.text[0] : null}</small>

      </form>
    );
  }
}
