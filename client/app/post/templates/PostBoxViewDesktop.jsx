import React, { Component } from 'react';
import moment from 'moment'
import helper from '../../components/Helper'

import PostMedia from '../PostMedia';
import PostShareLinks from '../PostShareLinks';
import PostVoteBox from '../PostVoteBox';

export default class PostBoxViewDesktop extends Component {
  render(){
    return (
      <div className="row justify-content-end mb-5 mt-4 ml-2 no-gutters">
        <div className="col-700">
          <h1 className="col-550">{this.props.post.title}</h1>

          { this.props.post.original ?
            (
              <h4>
                <a href={this.props.post.original}
                target="_blank" content="noindex, nofollow">
                  link do autor original
                </a>
              </h4>
            )
            : null
          }

          <div className="row no-gutters">
            <div className="col-550 p-0">
              <PostMedia
              image={this.props.post.image}
              video={this.props.post.video}
              postId={this.props.post.id} />
            </div>

            <div className="col-100 p-0 ml-3 align-self-center">
              {
                this.props.post.id === this.props.currentPost ?
                (
                  <PostVoteBox post={this.props.post}/>
                )
                : null
              }
            </div>
          </div>

          <div className="col-550">
            <div className="row">
              <div className="col-5">
                <small className="text-muted">
                {this.props.points || 0} {helper.pluralize(this.props.points, "ponto")}<br/>
                Publicado { moment(this.props.post.createdAt).fromNow() }
                </small>
              </div>

              <div className="col-7 mt-2 text-right">
                <PostShareLinks post={this.props.post} />
              </div>
            </div>

            <hr className="mt-2" />
          </div>

        </div>
      </div>
    );
  }
}
