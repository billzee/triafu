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
    pubsub
    .subscribe('comments', (msg, data)=>{
      this.setState({comments: data});
    });

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
          <strong>
             {this.props.comments.length} comentários
          </strong>
        </div>
      </div>
    );
  }
}

class CommentList extends Component {
  render() {
    return (
      <div className="row panel comment-middle">
        <div className="col-12">
          <ul className="list-unstyled">
            {
              this.props.comments.map((comment)=>{
                return(
                  <li key={comment.id}>
                    <div className="row">
                      <div className="col-2 pr-0 mt-2">
                      <img src="assets/bidu.jpg" width="48px" className="rounded-circle" />
                    </div>
                    <div className="col pt-2">
                      <strong>Guilherme Zordan</strong>
                      <br/>
                      <span className="comment-text">
                        {comment.text}
                      </span>
                    </div>
                    </div>
                      <div className="row mt-3">
                        <div className="col text-right">
                          <small>
                            <i className="fa fa-arrow-up mr-2"></i>
                            <i className="fa fa-arrow-down mr-2"></i>
                            <a href="#">Responder</a>
                          </small>
                        </div>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
    );
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

      pubsub.publish('comments', resJson);
    } catch(error){
      console.log(error);
    }
  }

  render(){
    return(
      <div className="row bt-white comment-bottom">
        <div className="col">
          <form onSubmit={this.postComment} method="post" className="form">
            <textarea value={this.state.text} onChange={this.setField.bind(this, 'text')}
             placeholder="escreva um comentário" className="form-control w-100   mb-2"></textarea>
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
