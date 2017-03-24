import React, { Component } from 'react';
import CommentsApi from '../api/CommentsApi';
import pubsub from 'pubsub-js'

export default class CommentList extends Component {
  constructor(){
    super();
    this.state = {showReply: '', comment: {text: ''}};
    this.toggleReply = this.toggleReply.bind(this);
    this.reply = this.reply.bind(this);
  }

  toggleReply(e, commentId){
    e.preventDefault();
    this.setState(({showReply: commentId}));
  }

  setField(input, e){
    var field = {};
    field[input] = e.target.value;
    this.setState(field);
  }

  async reply(e, commentId){
    e.preventDefault();

    console.log(this.state.comment);

    try{
      let res = await CommentsApi.reply(this.props.postId, commentId, this.state.comment);
      let resJson = await res.json();

      pubsub.publish('comments', resJson);
    } catch(error){
      console.log(error);
    }
  }

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
                    <div className="row mt-2">
                      <div className="col text-right">
                        <i className="fa fa-arrow-up mr-2"></i>
                        <i className="fa fa-arrow-down mr-2"></i>
                        {
                          this.state.showReply === comment.id ?
                          (<a href="#" onClick={(e) => this.toggleReply(e, '')}>Cancelar</a>) :
                          (<a href="#" onClick={(e) => this.toggleReply(e, comment.id)}>Responder</a>)
                        }
                      </div>
                    </div>
                    {
                      this.state.showReply === comment.id ?
                      <div className="row">
                        <div className="col">
                          <form onSubmit={(e) => this.reply(e, comment.id)} method="post">
                            <textarea value={this.state.comment.text} onChange={this.setField.bind(this, 'comment')} className="form-control w-100"></textarea>
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
                     : null
                    }
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
