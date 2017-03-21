import React, { Component } from 'react';
import api from '../components/Api';
import pubsub from 'pubsub-js'

export default class PostBox extends Component {
  constructor() {
    super();
    this.state = {posts: []};
  }

  async componentWillMount(){
    try{
      let res = await api('/posts', {method: 'GET'});
      let resJson = await res.json();
      this.setState({posts: resJson});
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    pubsub
    .subscribe('posts', (msg, data)=>{
      this.setState({posts: data});
    });
  }

  render(){
    return (
      <box>
      {
        this.state.posts.map(function(post){
          return(
          <div className="row justify-content-md-center">
            <div className="col col-md-auto">
              <h1 className="c-black text-center"> Titulo</h1>
              <div className="center black mt-4"></div>
            </div>
            <div className="col col-2 align-self-center pt-5">
              <div className="row no-gutters">
                <div className="col-8">
                  <ul className="list-unstyled bg-gray p-3 rounded">
                    <li>
                      <a>aaa</a>
                    </li>
                    <li>
                      <a>aaa</a>
                    </li>
                    <li>
                      <a>aaa</a>
                    </li>
                  </ul>
                </div>
                <div className="col-4">
                  <ul className="list-unstyled p-3">
                    <li>
                      12
                    </li>
                    <li>
                      12
                    </li>
                    <li>
                      12
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })
    }
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
