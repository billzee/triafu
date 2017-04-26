import React, { Component } from 'react';

import helper from '../components/Helper'
import pubsub from 'pubsub-js'

import TextAreaAutosize from '../components/TextAreaAutosize'
import ErrorMessage from '../components/ErrorMessage'

import RepliesApi from '../api/RepliesApi';

export default class ReplyForm extends Component {
  constructor(){
    super();
    this.state = {text: '', errors: {}};
  }

  async reply(e){
    e.preventDefault();

    try{
      let res = await RepliesApi._create(this.props.commentId, this.state);
      let resJson = await res.json();

      if(resJson.errors){
        helper.authErrorDispatcher(resJson.errors);
        this.setState({errors: resJson.errors});
      } else{
        this.setState({text: ''});
        pubsub.publish('submitted-reply', resJson);
      }

    } catch(error){
      console.log(error);
    }
  }

  render(){
    return (
      <form onSubmit={(e) => this.reply(e)} method="post" className="mb-2">

        <div className={"input-group" + (this.state.errors.hasOwnProperty('text') ? " has-danger" : "")}>
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

        <ErrorMessage message={this.state.errors.text} />

      </form>
    );
  }
}
