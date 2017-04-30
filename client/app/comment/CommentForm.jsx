import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import helper from '../components/Helper'
import TextAreaAutosize from '../components/TextAreaAutosize'
import ErrorMessage from '../components/ErrorMessage'

import CommentsApi from '../api/CommentsApi';

export default class CommentForm extends Component {
  constructor(){
    super();
    this.state = {text: '', errors: {}};
  }

  async comment(e){
    e.preventDefault();

    try{
      let res = await CommentsApi._create(this.props.postId, this.state);
      let resJson = await res.json();

      console.log(resJson);

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
  }

  render(){
    return(
      <div className="row bt-white pt-0 comment-bottom">
        <div className="col p-2 pt-0">
          <form onSubmit={(e) => this.comment(e)} method="post" className="form">

            <div className={"input-group " + (this.state.errors.hasOwnProperty('text') ? "has-danger" : "")}>
              <span className="input-group-btn">
                <button type="button" className="btn btn-sm btn-secondary">
                  <i className="fa fa-smile-o"/>
                </button>
              </span>

              <TextAreaAutosize
                value={this.state.text}
                onChange={helper.handleChange.bind(this, 'text')}
                style={{maxHeight: 50}}
                placeholder="escreva um comentário" />

              <span className="input-group-btn">
                <input type="submit" className="btn btn-sm btn-success" value="Comentar"></input>
              </span>
            </div>

            <ErrorMessage message={this.state.errors.text} />

          </form>
        </div>
      </div>
    );
  }
}
