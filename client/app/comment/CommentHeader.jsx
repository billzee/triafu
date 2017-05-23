import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class CommentHeader extends Component {
  constructor(props){
    super();
    this.hideCommentSection = this.hideCommentSection.bind(this);
  }

  hideCommentSection(){
    pubsub.publish('toggle-comment-section', false);
  }

  render(){
    return(
      <div className="row comment-top bb-white">
        <div className="col-9">
          <strong>
            {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
          </strong>
        </div>
        <div className="col-3 text-right">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}
