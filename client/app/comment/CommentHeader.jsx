import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import helper from '../components/Helper'

import CommentForm from './CommentForm';

export default class CommentHeader extends Component {
  render(){
    return(
      <div className="row bb-white no-gutters comment-header">
        {this.props.isMobile ?
          <div className="col-12 p-2">
            <div className="row no-gutters">
              <div className="col-8 align-self-center">
                <strong>
                  {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
                </strong>
              </div>
              <div className="col-4 align-self-center text-right">
                <button type="button"
                className="btn btn-sm btn-secondary"
                onClick={()=> helper.toggleComments()}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        :
          <div className="col-12 p-2">
            <strong>
              {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
            </strong>
          </div>
        }
        <CommentForm postId={this.props.postId} />
      </div>

    );
  }
}
