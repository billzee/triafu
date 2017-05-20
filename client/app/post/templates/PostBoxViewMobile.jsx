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
          <h1>{this.props.post.title}</h1>
          { this.props.post.original ?
            (
              <h4>
                <a href={"//"+this.props.post.original} target="_blank" content="noindex, nofollow">
                  link do autor original
                </a>
              </h4>
            )
            : null
          }
          <PostMedia
          image={this.props.post.image}
          video={this.props.post.video}
          postId={this.props.post.id} />

          <div className="row">
            <div className="col-sm-6 text-center">
              <small className="text-muted">
              {this.props.points || 0} {helper.pluralize(this.props.points, "ponto")}<br/>
              Publicado { moment(this.props.post.createdAt).fromNow() }
              </small>
            </div>
            <div className="col-sm-6 text-center mt-1">
              <PostShareLinks post={this.props.post} />
            </div>
          </div>

          <hr className="mt-2" />
        </div>
      </div>
    );
  }
}
