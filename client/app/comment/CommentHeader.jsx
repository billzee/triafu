import React, { Component } from 'react';
import helper from '../components/Helper'

import CommentForm from './CommentForm';

export default class CommentHeader extends Component {
  render(){
    return(
      <div className="row bb-white no-gutters comment-header">
        {this.props.isMobile ?
          <div className="col-12 p-2 mx">
            <div className="row no-gutters">
              <div className="col-8 align-self-center">
                <h2 className="mb-0">
                  {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
                </h2>
              </div>
              <div className="col-4 align-self-center text-right mx">
                <button type="button"
                className="btn btn-sm btn-secondary"
                onClick={()=>helper.toggleComments()}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        :
          <div className="col-12 pt-2 pb-0 mx">
            <h2 className="mb-0">
              {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
            </h2>
          </div>
        }
        <CommentForm postId={this.props.postId} />
      </div>
    );
  }
}
