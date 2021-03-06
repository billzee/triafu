import React, { Component } from 'react';

import pubsub from 'pubsub-js'
import CopyToClipboard from 'react-copy-to-clipboard';

import helper from '../components/Helper'

export default class PostShareLinks extends Component {
  constructor(props){
    super();
    this.state = {
      referenceId: '',
      postUrl: '',
      copyLinkLabel: 'Copiar Link',
      blockCopy: false,
    };
  }

  componentWillMount(){
    if(this.props.post) this.setState({referenceId: this.props.post.referenceId});
  }

  componentDidMount(){
    this.setupPostUrl();

    pubsub.subscribe('share-links-for', (msg, referenceId)=>{
      this.setState({referenceId: referenceId});
      this.setupPostUrl();
    });
  }

  setupPostUrl(){
    let postUrl = window.location.protocol + '//' + window.location.host + '/pub/' + this.state.referenceId;
    this.setState({postUrl: postUrl});
  }

  facebookShare(){
    FB.ui({
      method: 'share',
      href: this.state.postUrl
    }, function(response){});
  }

  twitterShare(){
    helper.popupCenter("https://twitter.com/intent/tweet?url=" + this.state.postUrl, '_blank', 600, 270);
  }

  render(){
    if (this.props.isMobile){
      return(
        <div className="row p-3">
          <div className="col-12">
            <CopyToClipboard
              text={this.state.postUrl}
              onCopy={()=> {
                this.setState({copyLinkLabel: 'Copiado!', blockCopy: true});
                setTimeout(()=>{ this.setState({copyLinkLabel: 'Copiar Link', blockCopy: false}); }, 2000);
              }}>
              <button className="btn btn-block btn-success" disabled={this.state.blockCopy}>
                <i className="fa fa-clipboard fa-1x"></i>
                <span className="ml-1">{this.state.copyLinkLabel}</span>
              </button>
            </CopyToClipboard>
            <hr/>
          </div>
          <div className="col-12">
            <button className="btn btn-block btn-facebook" onClick={()=>this.facebookShare()}>
              <i className="fa fa-facebook-f fa-1x"></i>
              <span className="ml-1">Facebook</span>
            </button>
            <hr/>
          </div>
          <div className="col-12">
            <button className="btn btn-block btn-twitter" onClick={()=>this.twitterShare()}>
              <i className="fa fa-twitter fa-1x"></i>
              <span className="ml-1">Twitter</span>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-4 pl-0 pr-0">
            <CopyToClipboard
              text={this.state.postUrl}
              onCopy={()=> {
                this.setState({copyLinkLabel: 'Copiado!', blockCopy: true});
                setTimeout(()=>{ this.setState({copyLinkLabel: 'Copiar Link', blockCopy: false}); }, 2000);
              }}>
              <button className="btn btn-sm btn-block btn-success" disabled={this.state.blockCopy}>
                <i className="fa fa-clipboard fa-1x"></i>
                <span className="ml-1">{this.state.copyLinkLabel}</span>
              </button>
            </CopyToClipboard>
          </div>
          <div className="col-4 pl-1 pr-0">
            <button className="btn btn-sm btn-block btn-facebook" onClick={()=>this.facebookShare()}>
              <i className="fa fa-facebook-f fa-1x"></i>
              <span className="ml-1">Facebook</span>
            </button>
          </div>
          <div className="col-4 pl-1">
            <button className="btn btn-sm btn-block btn-twitter" onClick={()=>this.twitterShare()}>
              <i className="fa fa-twitter fa-1x"></i>
              <span className="ml-1">Twitter</span>
            </button>
          </div>
        </div>
      );
    }
  }
}
