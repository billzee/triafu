import React, { Component } from 'react';
import pubsub from 'pubsub-js'

import helper from '../components/Helper'

export default class CommentHeader extends Component {
  render(){
    if(this.props.isMobile){
      return(
        <div className="row pt-1 pb-2">
          <div className="col-4 align-self-center pl-2">
            <button type="button"
            className="btn btn-sm btn-secondary"
            onClick={()=> helper.toggleComments()}>
              Fechar
            </button>
          </div>
          <div className="col-8 align-self-center text-right pr-2">
            <strong>
              {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
            </strong>
          </div>
        </div>
      );
    } else {
      return(
        <div className="row pt-1">
          <div className="col">
            <strong>
              {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
            </strong>
          </div>
        </div>
      );
    }
  }
}
