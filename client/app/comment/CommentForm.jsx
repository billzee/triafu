import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import helper from '../components/Helper'
import TextAreaAutosize from '../components/TextAreaAutosize'
import ErrorMessage from '../components/ErrorMessage'

import CommentsApi from '../api/CommentsApi';

export default class CommentForm extends Component {
  constructor(){
    super();
    this.state = {text: '', loading: false, errors: {}};
  }

  isSubmiting(e){
    if(e.which == 13 && ! e.shiftKey) this.comment();
  }

  async comment(e){
    if(e) e.preventDefault();
    if(this.state.loading) return;
    this.setState({loading: true});

    try{
      let res = await CommentsApi._create(this.props.postId, this.state);
      let resJson = await res.json();

      if(resJson.errors){
        helper.authErrorDispatcher(resJson.errors);
        this.setState({errors: resJson.errors});
      }else {
        this.setState({text: ''});
        pubsub.publish('submitted-comment', resJson.comment);
      }
    } catch(error){
      console.log(error);
    }

    this.setState({loading: false});
  }

  render(){
    return(
      <div className="col-12">
        <form onSubmit={(e) => this.comment(e)} method="post" className="form">

          <div className={"form-group mb-2" + (this.state.errors.hasOwnProperty('text') ? " has-danger" : "")}>
            <TextAreaAutosize
              id="comment-form"
              onKeyUp={(e) => this.isSubmiting(e)}
              value={this.state.text}
              onChange={helper.handleChange.bind(this, 'text')}
              style={{maxHeight: 50}}
              disabled={this.state.loading || !this.props.postId}
              placeholder="escreva um comentário" />
          </div>

          <div className="row">
            <div className="col-6 pr-0">
              <ErrorMessage message={this.state.errors.text} />
            </div>
            <div className="col-6 text-muted text-right pl-0">
              {500 - this.state.text.length}

              <button type="submit" className="btn btn-sm btn-success ml-2"
              disabled={this.state.loading || !this.props.postId}>Comentar</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}
