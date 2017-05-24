import React, { Component } from 'react';
import helper from '../../components/Helper'
import moment from 'moment'
import pubsub from 'pubsub-js'

import PostMedia from '../PostMedia';
import PostShareLinks from '../PostShareLinks';
import PostVoteBox from '../PostVoteBox';

export default class PostBoxViewMobile extends Component {
  constructor(){
    super();
    this.state = {share: false};

    this.toggleShareLinks = this.toggleShareLinks.bind(this);
    this.showCommentSection = this.showCommentSection.bind(this);
  }

  showCommentSection(){
    pubsub.publish('toggle-comment-section', true);
  }

  toggleShareLinks(){
    if(this.state.share === false){
      this.setState({share: true});
    } else{
      this.setState({share: false});
    }
  }

  render(){
    return (
      <box>
        <div className="row justify-content-center mb-2 mt-2 no-gutters">
          <div className="col-12 p-0">
            <h1 className="pl-2 pr-2">
              {this.props.post.title}
            </h1>
            { this.props.post.original ?
              (
                <h4>
                  <a href={"//"+this.props.post.original} target="_blank" content="noindex, nofollow">
                    link do autor original
                  </a>
                </h4>
              )
              : null }

            <PostMedia
            image={this.props.post.image}
            video={this.props.post.video}
            postId={this.props.post.id} />

            <div className="row pr-2 pl-2 mt-1">
              <div className="col-2 align-self-center pr-0">
                &nbsp;
                <button data-toggle="modal" data-target="#m_share_links"
                className="btn btn-block btn-secondary p-2">
                  <i className="fa fa-share-alt"></i>
                </button>
              </div>

              <div className="col-8 text-center pr-1 pl-1">
                <small className="text-muted">
                  {this.props.points || 0} {helper.pluralize(this.props.points, "ponto")}
                  &nbsp;&bull;&nbsp;publicado { moment(this.props.post.createdAt).fromNow() }
                </small>
                <PostVoteBox post={this.props.post} isMobile="true" />
              </div>

              <div className="col-2 align-self-center text-center pl-0">
                <span className="text-muted">{this.props.post.commentCount || 0}</span>
                <button data-toggle="modal" data-target="#m_comments"
                className="btn btn-block btn-secondary p-2">
                  <i className="fa fa-comments"></i>
                </button>
              </div>

            </div>

            <hr className="mt-3" />
          </div>

        </div>
        <div className="modal" id="m_share_links">
          <div className="modal-dialog mobile-share-links">
            <div className="row">
              <div className="col-8 text-muted">
                Compartilhar
              </div>
              <div className="col-4">
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
            </div>

            <PostShareLinks post={this.props.post} isMobile="true" />
          </div>
        </div>
      </box>
    );
  }
}
