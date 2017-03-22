import React, { Component } from 'react';
import api from '../components/Api';
import pubsub from 'pubsub-js'

export default class CommentBox extends Component {
  constructor() {
    super();
    this.state = {comments: [], postId: ''};
    this.getComments = this.getComments.bind(this);
  }

  async getComments(){
    try{
      let res = await api('/comments', {method: 'GET', params: {post_id: this.state.postId}});
      let resJson = await res.json();
      console.log(resJson);
      this.setState({comments: resJson});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    // pubsub
    // .subscribe('comments', (msg, data)=>{
    //   this.setState({comments: data});
    // });

    pubsub
    .subscribe('view-post', (msg, data)=>{
      this.setState({postId: data});
      this.getComments();
    });
  }

  render(){
    return (
      <box>
        <CommentCounter comments={this.state.comments} />
        <CommentList comments={this.state.comments} />
        <CommentForm postId={this.state.postId} />
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
            <div key={comment.id} className="col-12">
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
                <div className="col text-right">
                  <span className="glyphicon glyphicon-arrow-up mr-2"></span>
                  <span className="glyphicon glyphicon-arrow-down mr-2"></span>
                  <a href="#">responder</a>
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
    this.state = {text: 'comentario de teste'};
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
      let res = await api(
        '/comments',
        {
          method: 'POST',
          body: JSON.stringify(
            {
              text: this.state.text,
              post_id: this.props.postId
            }
          )
        }
      );
      let resJson = await res.json();
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
             aa {this.props.postId}
            <input type="submit" className="btn btn-success btn-sm"></input>
          </form>
        </div>
      </div>
    );
  }
}
