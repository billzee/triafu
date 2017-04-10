import React, { Component } from 'react';
import Moment from 'react-moment'
import CopyToClipboard from 'react-copy-to-clipboard';
import pubsub from 'pubsub-js'

export default class PostBox extends Component {
  constructor(props) {
    super(props);
    this.state = {post: props.post, postUrl: ''};
  }

  componentDidMount(){
    let postUrl = window.location.host + '/posts/' + this.state.post.id;
    this.setState({postUrl: postUrl});
  }

  render(){
    return (
      <div className="row justify-content-center mb-5 mt-4">
        <div className="col w-500 p-0">
          <h1>{this.state.post.title}</h1>

          <img src={this.state.post.media.image.url} className="post-image" />

          <div className="row no-gutters mt-2">
            <div className="col-5">
              <small className="text-muted">
                9986 pontos &bull; publicado <Moment fromNow>{this.state.post.created_at}</Moment>
              </small>

              <h3 className="mt-1">
                <a href="#" >
                  Link para o autor original
                </a>
              </h3>
            </div>
            <div className="col-7 text-right">
              <small className="text-muted">Compartilhar</small>
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <CopyToClipboard text={this.state.postUrl} onCopy={() => $('[data-toggle='+this.state.post.id+']').tooltip('show')}>
                    <button className="btn btn-sm btn-success" data-toggle={this.state.post.id} data-placement="bottom" data-title="Copiado!">
                      <i className="fa fa-clipboard fa-1x"></i>
                      <span className="ml-1">Copiar Link</span>
                    </button>
                  </CopyToClipboard>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-sm btn-facebook">
                    <i className="fa fa-facebook-f fa-1x"></i>
                    <span className="ml-1">Facebook</span>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-sm btn-twitter">
                    <i className="fa fa-twitter fa-1x"></i>
                    <span className="ml-1">Twitter</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <hr className="mt-2" />
        </div>

        <div className="col w-150 p-0 ml-3">
          {
            this.props.currentPost === this.state.post.id ?
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
