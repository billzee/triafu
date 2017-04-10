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
      let res = await CommentsApi._create(this.props.postId, this.state);
      let resJson = await res.json();

      pubsub.publish('comments', resJson);
      this.setState({text: ''});
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <div className="row bt-white pt-0 comment-bottom">
        <div className="col p-2 pt-0">
          <form onSubmit={this.comment} method="post" className="form">
            <TextArea value={this.state.text} onChange={helper.handleChange.bind(this, 'text')} rows="3" placeholder="escreva um comentário" />
            <ul className="list-unstyled list-inline float-right">
              <li className="list-inline-item">
                <input type="button" className="btn btn-secondary btn-sm" value=".gif"></input>
              </li>
              <li className="list-inline-item">
                <input type="submit" className="btn btn-success btn-sm" value="Comentar"></input>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
