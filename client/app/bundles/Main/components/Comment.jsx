import ReactOnRails from 'react-on-rails';
import React, { Component, ReactLayout } from 'react';
import api from '../components/Api';
import pubsub from 'pubsub-js'

var calculo = 2+7;

console.log(calculo);


export default class CommentBox extends Component {
  constructor() {
    super();
    console.log(module.exports);
    this.state = {comments: [], comment: {text: ''}};
  }

  async componentWillMount(){
    try{
      let res = await api('/comments', {method: 'GET'});
      let resJson = await res.json();
      this.setState({comments: resJson});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('comments', (msg, data)=>{
      this.setState({comments: data});
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

  async postComment(e){
    e.preventDefault();

    try{
      let res = await api('/comments', {method: 'POST', body: JSON.stringify({text: this.state.text})});
      let resJson = await res.json();
      pubsub.publish('comments', resJson);
    } catch(error){
      console.log(error);
    }
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
