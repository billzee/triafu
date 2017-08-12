import React, { Component } from 'react';
import PostMedia from '../PostMedia';
import helper from '../../components/Helper'
import moment from 'moment'
import PostShareLinks from '../PostShareLinks';
import PostVoteBox from '../PostVoteBox';

export default class PostBoxViewDesktop extends Component {
  render(){
    return (
      <div className="row no-gutters justify-content-end mt-4">
        <div className="col-550">
          <h1>{this.props.post.title}
          { this.props.post.id == this.props.currentPost ?
            (<span className="text-success">&nbsp;&#9679;</span>) : null
          }
          </h1>

          { this.props.post.original ?
            (
              <h2>
                <a href={this.props.post.original}
                target="_blank" content="noindex, nofollow">
                  link do autor original
                </a>
              </h2>
            )
            : null
          }

          <div className="row no-gutters">
            <div className="col-12">
              <PostMedia
              image={this.props.post.image}
              video={this.props.post.video}
              postId={this.props.post.id} />
            </div>
          </div>

          <div className="row no-gutters">
            <div className="col-12">
              <PostVoteBox post={this.props.post} />
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-5">
              <small className="text-muted">
              {this.props.points || 0} {helper.pluralize(this.props.points, "ponto")}<br/>
              Publicado { moment(this.props.post.createdAt).fromNow() }
              </small>
            </div>

            <div className="col-7 align-self-center mt-2 text-right">
              <PostShareLinks post={this.props.post} />
            </div>
          </div>

          <hr className="mt-2" />

        </div>
      </div>
    );
  }
}
