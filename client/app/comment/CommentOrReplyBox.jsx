import React, { Component } from 'react';
import pubsub from 'pubsub-js'
import moment from 'moment'

import helper from '../components/Helper';

import CommentOrReplyVoteBox from './CommentOrReplyVoteBox';

export default class CommentOrReplyBox extends Component {
  constructor(props){
    super();
    this.state = {
      release: null,
      isComment: (props.isComment || false),
      isReply: (props.isReply || false)
    };
  }

  componentDidMount(){
    pubsub.subscribe('submitted-comment', ()=>{
      this.setState({release: null});
    });
    pubsub.subscribe('submitted-reply', ()=>{
      this.setState({release: null});
    });
  }

  toggleReleaseText(e, commentId){
    e.preventDefault();
    this.setState(({release: commentId}));
  }

  render(){
    return (
      <box>
        <div className="row">
          <a href={"/usuario/" + this.props.commentOrReply.user.username} target="_blank">
            <img src={this.props.commentOrReply.user.image} width={this.props.photoSize}
            height={this.props.photoSize} className="rounded-circle ml-3 mt-1"/>
          </a>
          <div className="col pt-1 break-all">
            <a href={"/usuario/" + this.props.commentOrReply.user.username}
            target="_blank" className="black-hyperlink font-weight-bold">
              {this.props.commentOrReply.user.username}
            </a>
            &nbsp;
            {this.props.commentOrReply.user.id === this.props.postAuthor ? (<span className="badge badge-success">autor</span>) : null}
            <br/>
            <small className="text-muted">&nbsp;{ moment(this.props.commentOrReply.createdAt).fromNow() }</small>
            <br/>
            {
              this.props.commentOrReply.text.length <= helper.maxLengthForRelease ?
                (
                  <p className="comment-text"
                  dangerouslySetInnerHTML={{__html: helper.urlify(this.props.commentOrReply.text)}}>
                  </p>
                )
              : this.state.release === this.props.commentOrReply.id ?
                (
                  <p className="comment-text"
                  dangerouslySetInnerHTML={{__html: helper.urlify(this.props.commentOrReply.text)}}>
                  </p>
                )
              :
                (
                  <p className="comment-text"
                  dangerouslySetInnerHTML={{__html: this.props.commentOrReply.text.substring(0,helper.maxLengthForRelease) + "..."}}>
                  </p>
                )
            }
            {
              this.props.commentOrReply.text.length > helper.maxLengthForRelease ?
                this.state.release === this.props.commentOrReply.id ?
                  (
                    <a href="#" className="float-right"
                    onClick={(e) => this.toggleReleaseText(e, null)}>
                      <small>Recolher</small>
                    </a>
                  )
                :
                  (
                    <a href="#" className="float-right"
                    onClick={(e) => this.toggleReleaseText(e, this.props.commentOrReply.id)}>
                      <small>Ler mais</small>
                    </a>
                  )
              : null
            }
            <div className="row">
              <div className="col text-left">

                <a href onClick={(e) => {
                    e.preventDefault();
                    pubsub.publish("toggle-reply-to", (this.props.commentId || this.props.commentOrReply.id));
                  }
                }>
                  <small>responder</small>
                </a>

                <CommentOrReplyVoteBox commentOrReply={this.props.commentOrReply} isComment={this.state.isComment} isReply={this.state.isReply} />
              </div>
            </div>
          </div>
        </div>
      </box>
    );
  }
}
