import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class CommentHeader extends Component {
  render(){
    if(this.props.isMobile){
      return(
        <div className="row comment-top bb-white pb-2">
          <div className="col-9">
            <strong>
              {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
            </strong>
          </div>
          <div className="col-3 text-right">
            <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">
              Fechar
            </button>
          </div>
        </div>
      );
    } else {
      return(
        <div className="row comment-top bb-white">
          <div className="col-12">
            <strong>
              {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
            </strong>
          </div>
        </div>
      );
    }
  }
}
