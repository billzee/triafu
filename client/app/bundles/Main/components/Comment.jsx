import ReactOnRails from 'react-on-rails';
import React, { Component, ReactLayout } from 'react';

export default class CommentBox extends Component {
  constructor() {
    super();
    console.log(module.exports);
    this.state = {comments: [], comment: {text: ''}};
  }

  componentWillMount(){
    fetch('/comments')
    .then((response) => response.json())
    .then((res) => {
      console.log('will');
      this.setState({comments: res});
      console.log('set');
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render(){
    return (
      <box>
        <CommentCounter comments={this.state.comments} />
        <CommentList comments={this.state.comments} />
        <CommentForm comment={this.state.comment} />
      </box>
    );
  }
}

class CommentCounter extends Component {
  render(){
    return(
      <div className="row bb-white comment-top">
        <div className="col">
          <h4 className="text-center">
             {this.props.comments.length} comentários
          </h4>
        </div>
      </div>
    );
  }
}

class CommentList extends Component {
  render() {
    return (
      <div className="row panel comment-middle">
      {
        this.props.comments.map(function(comment){
          return(
            <div className="col-12">
              <div className="row">
                <div className="col-2 pr-0 mt-2">
                  <div className="float-right white"></div>
                </div>
                <div className="col pt-2">
                  <p>Guilherme Zordan</p>
                  {comment.text}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-right c-white">
                  <span className="glyphicon glyphicon-arrow-up mr-2"></span>
                  <span className="glyphicon glyphicon-arrow-down mr-2"></span>
                  <a href="#" className="c-white">responder</a>
                </div>
              </div>
            </div>
          );
        })
      }
      </div>
    )
  }
}

class CommentForm extends Component {

  constructor() {
    super();
    this.state = {text: 'dsadasdas'};
    this.postComment = this.postComment.bind(this);
  }

  setField(input, e){
    var field = {};
    field[input] = e.target.value;
    this.setState(field);
  }

  postComment(e){
    e.preventDefault();
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken()
      },
      credentials: 'same-origin',
      body: JSON.stringify({text: this.state.text}),
    })
  }

  render(){
    return(
      <div className="row bt-white comment-bottom">
        <div className="col">
          <form onSubmit={this.postComment} method="post" className="form-inline">
            <textarea value={this.state.text} onChange={this.setField.bind(this, 'text')}
             placeholder="escreva um comentário" className="form-control mr-2"></textarea>
            <input type="submit" className="btn btn-success btn-sm"></input>
          </form>
        </div>
      </div>
    );
  }
}
