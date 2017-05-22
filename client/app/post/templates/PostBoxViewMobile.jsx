import React, { Component } from 'react';
import PostMedia from '../PostMedia';
import helper from '../../components/Helper'
import moment from 'moment'
import PostShareLinks from '../PostShareLinks';
import PostVoteBox from '../PostVoteBox';

export default class PostBoxViewMobile extends Component {
  render(){
    return (
      <div className="row justify-content-center mb-3 mt-3 no-gutters">
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

          <div className="row pr-2 pl-2">
            <div className="col-12">
              <small className="text-muted">
              {this.props.points || 0} {helper.pluralize(this.props.points, "ponto")}
              &nbsp;&bull;&nbsp;Publicado { moment(this.props.post.createdAt).fromNow() }
              </small>
            </div>
          </div>

          <div className="row pr-2 pl-2 mt-1">
            <div className="col-9 pr-0">
              <PostVoteBox post={this.props.post} isMobile="true" />
            </div>
            <div className="col-3 pl-0 text-right align-self-center">
              <button className="btn btn-secondary p-2">
                <i className="fa fa-comments"></i> 999
              </button>
            </div>
          </div>

          <div className="row pr-2 pl-2">
            <div className="col-12 mt-2">
              <PostShareLinks post={this.props.post} />
            </div>
          </div>

          <hr className="mt-2" />
        </div>
      </div>
    );
  }
}
