import React, { Component } from 'react';

export default class CommentHeader extends Component {
  render(){
    return(
      <div className="row comment-top">
        <div className="col">
          <strong>
            {this.props.comments.length} comentários
          </strong>
        </div>
      </div>
    );
  }
}
