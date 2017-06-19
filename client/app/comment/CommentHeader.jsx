import React, { Component } from 'react';
import pubsub from 'pubsub-js'

export default class CommentHeader extends Component {
  closeNav(){
    document.getElementById("mobile-comments").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    var body = document.getElementsByTagName("body")[0];
    body.className = "";
  }

  render(){
    if(this.props.isMobile){
      return(
        <div className="row bb-white pt-1 pb-1">
          <div className="col-8 align-self-center pl-2">
            <strong>
              {this.props.totalCount || 0} {this.props.totalCount === 1 ? "comentário" : "comentários"}
            </strong>
          </div>
          <div className="col-4 align-self-center text-right pr-1">
            <button type="button"
            className="btn btn-sm btn-secondary"
            onClick={()=> this.closeNav()}>
              Fechar
            </button>
          </div>
        </div>
      );
    } else {
      return(
        <div className="row bb-white">
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
