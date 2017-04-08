import React, { Component } from 'react';
import Moment from 'react-moment'
import pubsub from 'pubsub-js'

export default class PostBox extends Component {

  render(){
    return (
      <div className="row justify-content-center mb-5 mt-4">
        <div className="col w-500 p-0">
          <h1>{this.props.post.title}</h1>

          <img src={this.props.post.media.image.url} className="post-image" />

          <div className="row no-gutters mt-1">
            <div className="col-8">
              <small className="text-muted">
                9986 pontos &bull; publicado <Moment fromNow>{this.props.post.created_at}</Moment>
              </small>
            </div>
            <div className="col">
              <small className="text-muted">Compartilhar</small>
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-5 mt-2">
              <a href="#"><h3>Link ao autor original</h3></a>
            </div>
            <div className="col-7 mt-1">
              <ul className="list-unstyled list-inline text-right">
                <li className="list-inline-item">
                  <button className="btn btn-sm btn-success">
                    <i className="fa fa-clipboard fa-1x"></i>
                    <span className="ml-1">Copiar Link</span>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-sm btn-primary">
                    <i className="fa fa-facebook-f fa-1x"></i>
                    <span className="ml-1">Facebook</span>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-sm btn-secondary">
                    <i className="fa fa-twitter fa-1x"></i>
                    <span className="ml-1">Twitter</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <hr />
        </div>

        <div className="col w-150 p-0 ml-3">
          {
            this.props.currentPost === this.props.post.id ?
            (
              <div className="row no-gutters p-fixed">
                <div className="col-8">
                  <ul className="list-unstyled bgm-gray p-3 rounded">
                    <li className="text-center">
                      <a href="#"><img src="/assets/funny.svg" width="35px" /></a>
                    </li>
                    <li className="mt-3 text-center">
                      <a href="#"><img src="/assets/brain.svg" width="35px"/></a>
                    </li>
                    <li className="mt-4 text-center">
                      <a href="#"><img src="/assets/downvote.svg" width="35px" /></a>
                    </li>
                  </ul>
                </div>
                <div className="col-4">
                  <ul className="list-unstyled p-3">
                    <li className="h-35">
                      33
                    </li>
                    <li className="mt-3 h-35">
                      10
                    </li>
                    <li className="mt-3 h-35">
                      2
                    </li>
                  </ul>
                </div>
              </div>
            )
            : null
          }
        </div>
      </div>
    );
  }
}
