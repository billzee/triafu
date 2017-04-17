import React, { Component } from 'react';

export default class CommentHeader extends Component {
  render(){
    return(
      <div className="row comment-top bb-white">
        <div className="col">
          <strong>
            {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
          </strong>
        </div>
      </div>
    );
  }
}
