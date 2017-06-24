import React, { Component } from 'react';

import helper from '../components/Helper'
import pubsub from 'pubsub-js'

import TextAreaAutosize from '../components/TextAreaAutosize'
import ErrorMessage from '../components/ErrorMessage'

import RepliesApi from '../api/RepliesApi';

export default class ReplyForm extends Component {
  constructor(){
    super();
    this.state = {text: '', loading: false, errors: {}};
  }

  isSubmiting(e){
    if(e.which == 13 && ! e.shiftKey) this.reply();
  }

  async reply(e){
    if(e) e.preventDefault();

    if(this.state.loading) return;
    this.setState({loading: true});

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

    this.setState({loading: false});
  }

  render(){
    return (
      <form onSubmit={(e) => this.reply(e)} method="post" className="mb-2">

        <div className={"input-group" + (this.state.errors.hasOwnProperty('text') ? " has-danger" : "")}>

          <TextAreaAutosize
            onKeyUp={(e) => this.isSubmiting(e)}
            value={this.state.text}
            onChange={helper.handleChange.bind(this, 'text')}
            style={{maxHeight: 50}}
            placeholder="escreva uma resposta" />

          <span className="input-group-btn">
            <input type="submit" disabled={this.state.loading} className="btn btn-sm btn-success" value="Responder"></input>
          </span>
        </div>

        <div className="row">
          <div className="col-9">
            <ErrorMessage message={this.state.errors.text} />
          </div>
          <div className="col-3 text-muted text-right">
            {500 - this.state.text.length}
          </div>
        </div>

      </form>
    );
  }
}
